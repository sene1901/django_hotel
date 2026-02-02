// import axios from "axios";

// // ==============================
// // AXIOS INSTANCE
// // ==============================
// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     Accept: "application/json",
//   },
// });

// // ==============================
// // REQUEST INTERCEPTOR → ajoute Bearer token
// // ==============================
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ==============================
// // RESPONSE INTERCEPTOR → refresh token automatique
// // ==============================
// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       localStorage.getItem("refresh_token")
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refresh = localStorage.getItem("refresh_token");
//         const res = await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/accounts/token/refresh/`,
//           { refresh } // clé attendue par DRF SimpleJWT
//         );

//         const newAccess = res.data.access;
//         localStorage.setItem("access_token", newAccess);
//         originalRequest.headers.Authorization = `Bearer ${newAccess}`;

//         return API(originalRequest);
//       } catch (err) {
//         // Refresh expiré → logout forcé
//         localStorage.clear();
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // ==============================
// // AUTH
// // ==============================
// export const register = (data) => API.post("/api/accounts/register/", data);
// export const login = (data) => API.post("/api/accounts/login/", data);
// export const getProfile = () => API.get("/api/accounts/profile/");
// export const forgotPassword = (data) => API.post("/api/accounts/password-reset/", data);
// export const resetPassword = (data) => API.post("/api/accounts/password-reset-confirm/", data);

// // LOGOUT
// export const logout = () => {
//   const refresh = localStorage.getItem("refresh_token");
//   return API.post("/api/accounts/logout/", { refresh }); // DRF SimpleJWT attend { refresh: "..." }
// };

// // ==============================
// // PROFILE
// // ==============================
// export const updateProfileImage = (formData) =>
//   API.put("/api/accounts/profile/image/", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// // ==============================
// // HOTELS
// // ==============================
// export const getHotels = () => API.get("/api/hotels/");
// export const createHotel = (formData) =>
//   API.post("/api/hotels/create/", formData);

// export const updateHotel = (id, formData) =>
//   API.put(`/api/hotels/${id}/update/`, formData, { headers: { "Content-Type": "multipart/form-data" } });
// export const deleteHotel = (id) => API.delete(`/api/hotels/${id}/delete/`);

// export default API;

// import axios from "axios";

// ==============================
// AXIOS INSTANCE
// ==============================
// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// // ==============================
// // REQUEST INTERCEPTOR → ajoute Bearer token
// // ==============================
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ==============================
// // RESPONSE INTERCEPTOR → refresh token automatique
// // ==============================
// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       localStorage.getItem("refresh_token")
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refresh = localStorage.getItem("refresh_token");
//         const res = await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/auth/jwt/refresh/`,
//           { refresh }
//         );

//         const newAccess = res.data.access;
//         localStorage.setItem("access_token", newAccess);
//         originalRequest.headers.Authorization = `Bearer ${newAccess}`;

//         return API(originalRequest);
//       } catch (err) {
//         // Refresh expiré → logout forcé
//         localStorage.clear();
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // ==============================
// // AUTHENTICATION (Djoser / JWT)
// // ==============================
// export const register = (data) =>
//   API.post("/api/auth/users/", data); // Djoser endpoint standard

// export const login = (data) =>
//   API.post("/api/auth/jwt/create/", data); // renvoie access + refresh

// export const logout = () => {
//   const refresh = localStorage.getItem("refresh_token");
//   return API.post("/api/auth/jwt/logout/", { refresh }); // endpoint Djoser logout
// };

// export const getProfile = () => API.get("/api/auth/users/me/"); // récupère info user

// export const forgotPassword = (data) =>
//   API.post("/api/auth/users/reset_password/", data); // Djoser reset password

// export const resetPassword = (data) =>
//   API.post("/api/auth/users/reset_password_confirm/", data); // confirm reset

// // ==============================
// // PROFILE
// // ==============================
// export const updateProfileImage = (formData) =>
//   API.put("/api/auth/users/me/", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// // ==============================
// // HOTELS
// // ==============================
// export const getHotels = () => API.get("/api/hotels/");
// export const createHotel = (formData) =>
//   API.post("/api/hotels/create/", formData);

// export const updateHotel = (id, formData) =>
//   API.put(`/api/hotels/${id}/update/`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// export const deleteHotel = (id) => API.delete(`/api/hotels/${id}/delete/`);

// export default API;



import axios from "axios";

// ==============================
// CONFIGURATION DE BASE
// ==============================
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Debug : afficher l'URL utilisée
console.log("🔗 API Base URL:", BASE_URL);
console.log("📋 Environment:", import.meta.env.MODE);

// ==============================
// AXIOS INSTANCE
// ==============================
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ==============================
// REQUEST INTERCEPTOR → Ajoute le token Bearer
// ==============================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug : afficher chaque requête
    console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error("❌ Erreur Request Interceptor:", error);
    return Promise.reject(error);
  }
);

// ==============================
// RESPONSE INTERCEPTOR → Gestion refresh token
// ==============================
API.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Debug erreur
    if (error.response) {
      console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response.status}`);
      console.error("Erreur Django:", error.response.data);
    } else {
      console.error("❌ Erreur réseau:", error.message);
    }

    // Tentative de refresh token si 401
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token")
    ) {
      originalRequest._retry = true;
      
      try {
        console.log("🔄 Tentative de refresh token...");
        const refresh = localStorage.getItem("refresh_token");
        
        const res = await axios.post(
          `${BASE_URL}/api/auth/jwt/refresh/`,
          { refresh }
        );

        const newAccess = res.data.access;
        localStorage.setItem("access_token", newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        console.log("✅ Token rafraîchi avec succès");
        return API(originalRequest);
      } catch (err) {
        console.error("❌ Échec du refresh token, déconnexion...");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// ==============================
// AUTHENTICATION (Djoser / JWT)
// ==============================

/**
 * Inscription d'un nouvel utilisateur
 * @param {Object} data - { email, username, password, re_password }
 */
export const register = (data) => {
  console.log("📝 Inscription avec:", { ...data, password: "***" });
  return API.post("/api/auth/users/", data);
};

/**
 * Connexion utilisateur
 * @param {Object} data - { email, password }
 */
export const login = (data) => {
  console.log("🔐 Login avec:", { ...data, password: "***" });
  return API.post("/api/auth/jwt/create/", data);
};

/**
 * Déconnexion (supprime les tokens localement)
 */
export const logout = () => {
  console.log("👋 Déconnexion...");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  return Promise.resolve();
};

/**
 * Récupérer le profil de l'utilisateur connecté
 */
export const getProfile = () => {
  console.log("👤 Récupération du profil...");
  return API.get("/api/auth/users/me/");
};

/**
 * Demander un reset de mot de passe
 * @param {Object} data - { email }
 */
export const forgotPassword = (data) => {
  console.log("🔑 Demande de reset password pour:", data.email);
  return API.post("/api/auth/users/reset_password/", data);
};

/**
 * Confirmer le nouveau mot de passe
 * @param {Object} data - { uid, token, new_password, re_new_password }
 */
export const resetPassword = (data) => {
  console.log("🔐 Confirmation nouveau mot de passe");
  return API.post("/api/auth/users/reset_password_confirm/", data);
};

/**
 * Activer un compte utilisateur
 * @param {string} uid - User ID encodé
 * @param {string} token - Token d'activation
 */
export const activateAccount = (uid, token) => {
  console.log("✉️ Activation du compte:", { uid });
  return API.post("/api/auth/users/activation/", { uid, token });
};

/**
 * Renvoyer l'email d'activation
 * @param {string} email - Email de l'utilisateur
 */
export const resendActivation = (email) => {
  console.log("📧 Renvoi email d'activation à:", email);
  return API.post("/api/auth/users/resend_activation/", { email });
};

// ==============================
// PROFILE
// ==============================

/**
 * Mettre à jour le profil utilisateur
 * @param {Object} data - Données à mettre à jour
 */
export const updateProfile = (data) => {
  console.log("✏️ Mise à jour du profil");
  return API.patch("/api/auth/users/me/", data);
};

/**
 * Mettre à jour l'image de profil
 * @param {FormData} formData - FormData contenant l'image
 */
export const updateProfileImage = (formData) => {
  console.log("🖼️ Upload image de profil");
  return API.patch("/api/auth/users/me/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ==============================
// HOTELS
// ==============================

/**
 * Récupérer tous les hôtels
 */
export const getHotels = () => {
  console.log("🏨 Récupération de tous les hôtels");
  return API.get("/api/hotels/");
};

/**
 * Créer un nouvel hôtel
 * @param {FormData} formData - Données de l'hôtel avec images
 */
export const createHotel = (formData) => {
  console.log("➕ Création d'un hôtel");
  return API.post("/api/hotels/create/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/**
 * Mettre à jour un hôtel
 * @param {number} id - ID de l'hôtel
 * @param {FormData} formData - Nouvelles données
 */
export const updateHotel = (id, formData) => {
  console.log(`✏️ Mise à jour de l'hôtel ${id}`);
  return API.put(`/api/hotels/${id}/update/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/**
 * Supprimer un hôtel
 * @param {number} id - ID de l'hôtel
 */
export const deleteHotel = (id) => {
  console.log(`🗑️ Suppression de l'hôtel ${id}`);
  return API.delete(`/api/hotels/${id}/delete/`);
};

// ==============================
// UTILITY FUNCTIONS
// ==============================

/**
 * Vérifier si l'utilisateur est authentifié
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

/**
 * Obtenir le token d'accès
 */
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

/**
 * Sauvegarder les tokens après login
 */
export const saveTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

/**
 * Supprimer tous les tokens
 */
export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export default API;