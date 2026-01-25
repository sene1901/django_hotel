import axios from "axios";

// ==============================
// AXIOS INSTANCE
// ==============================
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
});

// ==============================
// REQUEST INTERCEPTOR → ajoute Bearer token
// ==============================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==============================
// RESPONSE INTERCEPTOR → refresh token automatique
// ==============================
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token")
    ) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refresh_token");
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/accounts/token/refresh/`,
          { refresh } // clé attendue par DRF SimpleJWT
        );

        const newAccess = res.data.access;
        localStorage.setItem("access_token", newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return API(originalRequest);
      } catch (err) {
        // Refresh expiré → logout forcé
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// ==============================
// AUTH
// ==============================
export const register = (data) => API.post("/accounts/register/", data);
export const login = (data) => API.post("/accounts/login/", data);
export const getProfile = () => API.get("/accounts/profile/");
export const forgotPassword = (data) => API.post("/accounts/password-reset/", data);
export const resetPassword = (data) => API.post("/accounts/password-reset-confirm/", data);

// LOGOUT
export const logout = () => {
  const refresh = localStorage.getItem("refresh_token");
  return API.post("/accounts/logout/", { refresh }); // DRF SimpleJWT attend { refresh: "..." }
};

// ==============================
// PROFILE
// ==============================
export const updateProfileImage = (formData) =>
  API.put("/accounts/profile/image/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ==============================
// HOTELS
// ==============================
export const getHotels = () => API.get("/hotels/");
export const createHotel = (formData) =>
  API.post("/hotels/create/", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateHotel = (id, formData) =>
  API.put(`/hotels/${id}/update/`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteHotel = (id) => API.delete(`/hotels/${id}/delete/`);

export default API;
