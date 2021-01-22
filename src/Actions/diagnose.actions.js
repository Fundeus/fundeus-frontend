import * as RequestConstants from "Constants/request.constants";

export const diagnoseAPI = (imageURL, form) => {
  return {
    type: RequestConstants.DIAGNOSE_API_PENDING,
    payload: { imageURL, form },
  };
};

export const getResultsAPI = (hash) => ({
  type: RequestConstants.GET_RESULTS_API_PENDING,
  payload: { hash },
});

export const updatePatientForm = (form) => ({
  type: RequestConstants.UPDATE_PATIENT_HISTORY_PENDING,
  payload: form,
});

export const getRandomFundusImages = (number) => ({
  type: RequestConstants.GET_RANDOM_IMAGES,
  payload: { number },
});
