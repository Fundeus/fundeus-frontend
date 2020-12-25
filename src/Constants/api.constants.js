export const API_ENDPOINTS = {
  UPLOAD_IMAGE: "/fundus-image",
  GET_RESULTS: "/diagnosis",
  GET_RESULT: (hash) => `/diagnosis/${hash}`,
};

export const STATUS_TYPE = {
  INFORMATION: 1,
  SUCCESS: 2,
  REDIRECT: 3,
  CLIENT_ERROR: 4,
  SERVER_ERROR: 5,
};
