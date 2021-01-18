import { all, put, takeLatest } from "redux-saga/effects";

import * as RequestConstants from "Constants/request.constants";
import { getStatusCodeFamily, apiErrorHandler } from "Helpers/saga.helpers";

import apiGenerator from "Helpers/api.helpers";

import { API_ENDPOINTS, STATUS_TYPE } from "Constants/api.constants";

function* diagnoseAPISaga(action) {
  const { imageURL } = action.payload;
  const api = apiGenerator("post")(API_ENDPOINTS.UPLOAD_IMAGE, {
    url: imageURL,
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
  }
}

function* getResultsAPISaga(action) {
  const { hash } = action.payload;

  const api = apiGenerator("get", {
    result_hash: hash,
  })(API_ENDPOINTS.GET_RESULT(hash));

  try {
    const response = yield api;
    if (getStatusCodeFamily(response.status) === STATUS_TYPE.SUCCESS) {
      yield put({
        type: RequestConstants.GET_RESULTS_API_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: RequestConstants.GET_RESULTS_API_FAILURE,
        payload: apiErrorHandler({ response }),
      });
    }
  } catch (err) {
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
