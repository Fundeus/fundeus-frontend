import { all, fork } from "redux-saga/effects";

import DiagnoseSagas from "./diagnose.saga";

// RootSaga
export default function* root() {
  yield all([fork(DiagnoseSagas)]);
}
