import * as RequestConstants from "Constants/request.constants";

export const diagnoseAPI = (imageURL) => {
  return {
    type: RequestConstants.DIAGNOSE_API_PENDING,
    payload: { imageURL },
  };
};

export const getResultsAPI = (hash) => ({
  type: RequestConstants.GET_RESULTS_API_PENDING,
  payload: { hash },
});
