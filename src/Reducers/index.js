import { combineReducers } from "redux";

import diagnoseCTX from "./diagnose";

export default (history) =>
  combineReducers({
    diagnoseCTX,
  });
