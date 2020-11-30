import { REQUEST_STATUS } from "Constants/global.constants";
import * as RequestConstants from "Constants/request.constants";

const initialState = {
  // accessToken: getAccessTokenFromLocalStorage(),
  DiagnoseCTX: {
    status: REQUEST_STATUS.NOT_DEFINED,
    error: false,
  },
  getResultsCTX: {
    status: REQUEST_STATUS.NOT_DEFINED,
    error: false,
  },
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case RequestConstants.GET_RESULTS_API_PENDING:
      return getResultsAPIPending(state);
    case RequestConstants.GET_RESULTS_API_SUCCESS:
      return getResultsAPISuccess(state, action);
    case RequestConstants.GET_RESULTS_API_FAILURE:
      return getResultsAPIFailure(state, action);
    case RequestConstants.DIAGNOSE_API_PENDING:
      return diagnoseAPIPending(state, action);
    case RequestConstants.DIAGNOSE_API_SUCCESS:
      return diagnoseAPISuccess(state, action);
    case RequestConstants.DIAGNOSE_API_FAILURE:
      return diagnoseAPIFailure(state, action);
    default:
      return state;
  }
}

function getResultsAPIPending(state) {
  return {
    ...state,
    getResultsCTX: {
      status: REQUEST_STATUS.PENDING,
      error: false,
      data: null,
    },
  };
}

function getResultsAPISuccess(state, action) {
  return {
    ...state,
    getResultsCTX: {
      status: REQUEST_STATUS.SUCCESS,
      error: false,
      data: action.payload,
    },
  };
}

function getResultsAPIFailure(state) {
  return {
    ...state,
    getResultsCTX: {
      status: REQUEST_STATUS.FAILURE,
      error: true,
    },
  };
}
function diagnoseAPIPending(state) {
  return {
    ...state,
    DiagnoseCTX: {
      status: REQUEST_STATUS.PENDING,
      error: false,
      data: null,
    },
  };
}

function diagnoseAPISuccess(state, action) {
  return {
    ...state,
    DiagnoseCTX: {
      status: REQUEST_STATUS.SUCCESS,
      error: false,
      data: action.payload,
    },
  };
}

function diagnoseAPIFailure(state) {
  return {
    ...state,
    DiagnoseCTX: {
      status: REQUEST_STATUS.FAILURE,
      error: true,
    },
  };
}
