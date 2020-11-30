import * as RequestConstants from "Constants/request.constants";

export const DiagnoseAPI = (imageURL) => ({
  type: RequestConstants.DIAGNOSE_API_PENDING,
  payload: { imageURL },
});

export const getResultsAPI = (accessToken) => ({
  type: RequestConstants.GET_RESULTS_API_PENDING,
  payload: { accessToken },
});
