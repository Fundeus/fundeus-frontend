import { combineReducers } from "redux";

import { localizeReducer } from "react-localize-redux";

import diagnoseCTX from "./diagnose";

export default (history) =>
  combineReducers({
    diagnoseCTX,
  });
