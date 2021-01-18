import { combineReducers } from "redux";

import diagnose from "./diagnose";

export default (history) =>
  combineReducers({
    diagnose,
  });
