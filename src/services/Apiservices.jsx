// Base Url which we use in api calling ========================

const BASE_URL = "http://localhost:8080";

// used for store token ========================

const getHeaders = () => {
  const token = localStorage.getItem("Token");
  return {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };
};

const Apiservices = {
  // ========================  FOr get ========================

  get: async (url) => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "GET",
      headers: getHeaders(),
    });
    return response.ok ? response.json() : Promise.reject(response.statusText);
  },

  // ======================== For POst ========================
  post: async (url, data) => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return response.ok ? response.json() : Promise.reject(response.statusText);
  },
  // ======================== For put ========================
  put: async (url, data) => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return response.ok ? response.json() : Promise.reject(response.statusText);
  },
  // ======================== For delete ========================
  delete: async (url) => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return response.ok ? response.json() : Promise.reject(response.statusText);
  },
};

export default Apiservices;
