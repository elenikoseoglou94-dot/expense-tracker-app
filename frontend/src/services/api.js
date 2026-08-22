const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const buildHeaders = (customHeaders = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...customHeaders
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const responseData = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(
      typeof responseData === 'object' && responseData?.message
        ? responseData.message
        : 'Κάτι πήγε στραβά.'
    );

    error.response = {
      status: response.status,
      data: responseData
    };

    throw error;
  }

  return { data: responseData };
};

const request = async (path, options = {}) => {
  const { method = 'GET', body, headers } = options;
  const requestOptions = {
    method,
    headers: buildHeaders(headers)
  };

  if (body !== undefined) {
    requestOptions.body = JSON.stringify(body);
    requestOptions.headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${path}`, requestOptions);
  return parseResponse(response);
};

const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  delete: (path) => request(path, { method: 'DELETE' })
};

export default api;
