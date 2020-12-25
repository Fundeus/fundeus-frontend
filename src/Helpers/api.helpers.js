import axios from "axios";

const apiGenerator = (type, accessToken = null) => {
  const headers = {
    "content-type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers,
  };

  switch (type) {
    case "get":
      return (url, options = {}) =>
        axios.get(url, { ...defaultOptions, ...options });
    case "post":
      return (url, data, options = {}) =>
        axios.post(url, data, { ...defaultOptions, ...options });
    case "patch":
      return (url, data, options = {}) =>
        axios.patch(url, data, { ...defaultOptions, ...options });
    case "put":
      return (url, data, options = {}) =>
        axios.put(url, data, { ...defaultOptions, ...options });
    case "delete":
      return (url, options = {}) =>
        axios.delete(url, { ...defaultOptions, ...options });
    default:
      return null;
  }
};

export default apiGenerator;
