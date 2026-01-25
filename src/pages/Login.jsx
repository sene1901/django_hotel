import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthLayout from "../components/AuthLayout";
import { login } from "../api/api"; 

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

 
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "L'email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Format d'email invalide.";

    if (!password) newErrors.password = "Le mot de passe est requis.";
    else if (password.length < 6)
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await login({ email, password });
      const { access, refresh, user } = res.data;

    
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(user));

    
      navigate("/dashboard" , { replace: true });
    } catch (error) {
      console.error("Erreur login:", error.response?.data);

      
      if (error.response?.status === 400) {
        setErrors({ email: "Email ou mot de passe incorrect", password: "Email ou mot de passe incorrect" });
      } else {
        alert("Erreur serveur, réessayez plus tard");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-sm sm:max-w-md w-full">
          <div className="text-center mb-5">
            <h1 className="text-white font-semibold tracking-wide text-lg">
              <span className="font-bold">RED</span> PRODUCT
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
            <h2 className="text-center text-gray-700 mb-6 text-sm sm:text-base">
              Connectez-vous en tant que <span className="font-semibold">Admin</span>
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border-0 border-b px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.email ? "focus:ring-red-500 border-red-500" : "focus:ring-gray-600 border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">Mot de passe</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border-0 border-b px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.password ? "focus:ring-red-500 border-red-500" : "focus:ring-gray-600 border-gray-300"
                  } pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 top-6"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Souviens-toi */}
              <div className="flex items-center text-xs sm:text-sm text-[#494C4F]">
                <input type="checkbox" className="mr-2 accent-gray-800" />
                Gardez-moi connecté
              </div>

              <button
                type="submit"
                className="w-full bg-[#494C4F] text-white py-2 rounded-md hover:bg-gray-900 transition text-sm sm:text-base cursor-pointer"
              >
                Se connecter
              </button>
            </form>
          </div>

          <div className="text-center mt-6 text-xs sm:text-sm">
            <Link to="/forgot-password" className="text-yellow-500 hover:underline block">
              Mot de passe oublié ?
            </Link>

            <p className="text-white mt-2">
              Vous n'avez pas de compte ?{" "}
              <Link to="/register" className="text-yellow-500 hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
