import { REQUEST_STATUS } from "Constants/global.constants";
import * as RequestConstants from "Constants/request.constants";
import FUNDUS_IMAGES from "./fundusUrls";
import _ from "lodash";

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
  patientFormCTX: {
    age: "",
    sex: "",
    race: "",
    tags: {},
  },
  fundusImagesCTX: {
    number: null,
    selectedImages: [],
  },
};

export default function diagnose(state = initialState, action) {
  switch (action.type) {
    case RequestConstants.UPDATE_PATIENT_HISTORY_PENDING:
      return updatePatientHistoryForm(state, action);
    case RequestConstants.GET_RANDOM_IMAGES:
      return selectRandomFundusImages(state, action);
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

function selectRandomFundusImages(state, action) {
  const { number } = action.payload;
  const selectedImages = _.sampleSize(FUNDUS_IMAGES, number);

  return {
    ...state,
    fundusImagesCTX: {
      number: number,
      selectedImages,
    },
  };
}

function updatePatientHistoryForm(state, action) {
  const { age, sex, race, tags } = action.payload;
  console.log("updatePatientHistoryForm", action.payload);
  return {
    ...state,
    patientFormCTX: {
      age: age || state.patientFormCTX.age,
      sex: sex || state.patientFormCTX.sex,
      race: race || state.patientFormCTX.race,
      tags: { ...state.patientFormCTX.tags, ...tags },
    },
  };
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
    DiagnoseCTX: {
      ...state.DiagnoseCTX,
      status: REQUEST_STATUS.NOT_DEFINED,
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
    DiagnoseCTX: {
      ...state.DiagnoseCTX,
      status: REQUEST_STATUS.NOT_DEFINED,
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
