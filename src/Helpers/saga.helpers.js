export function getStatusCodeFamily(status) {
  return parseInt(String(status).charAt(0), 10);
}

export function apiErrorHandler(err) {
  return err.response ? err.response.data : { client_code: 700 };
}
