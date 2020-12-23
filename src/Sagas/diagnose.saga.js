import { all, put, takeLatest } from "redux-saga/effects";

import * as RequestConstants from "Constants/request.constants";

function* diagnoseAPISaga(action) {
  const { requestPayload } = action.payload;
  // const api = apiGenerator("post", accessToken)(API_ENDPOINTS.LOGOUT, requestPayload);
  try {
    // yield api;
  } catch (err) {
    // Logout error
  }
}

function* getResultsAPISaga(action) {
  const { requestPayload } = action.payload;
  // const api = apiGenerator("post", accessToken)(API_ENDPOINTS.LOGOUT, requestPayload);

  try {
    // yield api;
  } catch (err) {
    // Logout error
  }
}

export default function* root() {
  yield all([
    takeLatest(RequestConstants.DIAGNOSE_API_PENDING, diagnoseAPISaga),
    takeLatest(RequestConstants.GET_RESULTS_API_PENDING, getResultsAPISaga),
  ]);
}
