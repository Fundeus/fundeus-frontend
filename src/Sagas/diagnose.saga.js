import { all, put, takeLatest } from "redux-saga/effects";

import * as RequestConstants from "Constants/request.constants";
import { getStatusCodeFamily, apiErrorHandler } from "Helpers/saga.helpers";

import apiGenerator from "Helpers/api.helpers";

import { API_ENDPOINTS, STATUS_TYPE } from "Constants/api.constants";

function* diagnoseAPISaga(action) {
  const { imageURL, form, retry } = action.payload;

  const api = apiGenerator("post")(API_ENDPOINTS.UPLOAD_IMAGE, {
    url: imageURL,
    form: JSON.stringify(form),
  });

  try {
    const response = yield api;
    if (getStatusCodeFamily(response.status) === STATUS_TYPE.SUCCESS) {
      yield put({
        type: RequestConstants.DIAGNOSE_API_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: RequestConstants.DIAGNOSE_API_FAILURE,
        payload: apiErrorHandler({ response }),
      });
    }
  } catch (err) {
    yield put({
      type: RequestConstants.DIAGNOSE_API_FAILURE,
      payload: apiErrorHandler(err),
    });
    if (!retry) {
      yield put({
        type: RequestConstants.DIAGNOSE_API_PENDING,
        payload: { imageURL, form, retry: true },
      });
    }
  }
}

function* getResultsAPISaga(action) {
  const { hash, tryNumber = 0 } = action.payload;

  const api = apiGenerator("get", {
    result_hash: hash,
  })(API_ENDPOINTS.GET_RESULT(hash));

  try {
    const response = yield api;
    console.log("getResultsAPISaga", response);
    if (getStatusCodeFamily(response.status) === STATUS_TYPE.SUCCESS) {
      console.log("response.data", response.data);
      yield put({
        type: RequestConstants.GET_RESULTS_API_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: RequestConstants.GET_RESULTS_API_FAILURE,
        payload: apiErrorHandler({ response }),
      });
      if (tryNumber < 3) {
        yield put({
          type: RequestConstants.GET_RESULTS_API_PENDING,
          payload: { hash, tryNumber: tryNumber + 1 },
        });
      }
    }
  } catch (err) {
    if (tryNumber < 3) {
      yield put({
        type: RequestConstants.GET_RESULTS_API_PENDING,
        payload: { hash, tryNumber: tryNumber + 1 },
      });
    }
    yield put({
      type: RequestConstants.GET_RESULTS_API_FAILURE,
      payload: apiErrorHandler(err),
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(RequestConstants.DIAGNOSE_API_PENDING, diagnoseAPISaga),
    takeLatest(RequestConstants.GET_RESULTS_API_PENDING, getResultsAPISaga),
  ]);
}
