// import { createContext, useContext, useEffect, useState } from "react";
// import { getProfile, login as apiLogin, logout as apiLogout } from "../api/api";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Récupérer le profil si access_token existe
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const access = localStorage.getItem("access_token");
//       if (!access) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await getProfile();
//         setUser(res.data);
//       } catch (err) {
//         console.error("Erreur fetch profile:", err.response?.data || err.message);
//         localStorage.clear();
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Login avec email/password
//   const login = async (data) => {
//     try {
//       const res = await apiLogin(data);
//       const { access, refresh, user } = res.data;

//       localStorage.setItem("access_token", access);
//       localStorage.setItem("refresh_token", refresh);
//       localStorage.setItem("user", JSON.stringify(user));

//       setUser(user);
//     } catch (err) {
//       console.error("Erreur login:", err.response?.data || err.message);
//       throw err; // pour que le formulaire login affiche l'erreur
//     }
//   };

//   // Logout
//   const logout = async () => {
//     try {
//       await apiLogout(); // pas besoin de passer refresh, il est lu directement dans api.js
//     } catch (err) {
//       console.error("Erreur logout:", err.response?.data || err.message);
//     } finally {
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");
//       localStorage.removeItem("user");
//       setUser(null);
//       window.location.href = "/login"; // redirection vers login
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, login as apiLogin, logout as apiLogout } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==============================
  // Récupérer le profil si access_token existe
  // ==============================
  useEffect(() => {
    const fetchProfile = async () => {
      const access = localStorage.getItem("access_token");
      if (!access) {
        setLoading(false);
        return;
      }

      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        console.error("Erreur fetch profile:", err.response?.data || err.message);
        localStorage.clear(); // supprimer tokens si invalide
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==============================
  // Login avec email/password
  // ==============================
  const login = async ({ email, password }) => {
    try {
      const res = await apiLogin({ email, password });
      const { access, refresh } = res.data;

      // Sauvegarde tokens
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Récupère user immédiatement après login
      const profileRes = await getProfile();
      setUser(profileRes.data);
      localStorage.setItem("user", JSON.stringify(profileRes.data));
    } catch (err) {
      console.error("Erreur login:", err.response?.data || err.message);
      throw err; // pour afficher l'erreur dans le formulaire
    }
  };

  // ==============================
  // Logout
  // ==============================
  const logout = async () => {
    try {
      await apiLogout(); // DRF SimpleJWT blacklist
    } catch (err) {
      console.error("Erreur logout:", err.response?.data || err.message);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/login"; // redirection forcée
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom
export const useAuth = () => useContext(AuthContext);

