import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { resetPassword } from "../api/api";

const ResetPassword = () => {
  const { uid, token } = useParams(); // Récupération depuis l'URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Reset error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation frontend
    if (formData.new_password !== formData.re_new_password) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.new_password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        uid,
        token,
        new_password: formData.new_password,
        re_new_password: formData.re_new_password
      });

      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
      
    } catch (err) {
      console.error("Reset password error:", err);
      
      if (err.response?.data) {
        const errorData = err.response.data;
        
        if (errorData.token) {
          setError("Le lien de réinitialisation est invalide ou expiré");
        } else if (errorData.new_password) {
          setError(errorData.new_password[0]);
        } else if (errorData.uid) {
          setError("Lien invalide");
        } else if (errorData.detail) {
          setError(errorData.detail);
        } else {
          setError("Une erreur est survenue lors de la réinitialisation");
        }
      } else {
        setError("Erreur de connexion au serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center justify-center px-4">
          <div className="mb-6 text-center">
            <h1 className="text-white font-semibold tracking-wide text-lg">
              <span className="font-bold">RED</span> PRODUCT
            </h1>
          </div>

          <div className="w-full max-w-sm sm:max-w-md bg-white rounded-md shadow-xl p-6 sm:p-8 text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-gray-800 font-medium mb-3 text-base sm:text-lg">
              Mot de passe réinitialisé !
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Redirection vers la page de connexion...
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="mb-6 text-center">
          <h1 className="text-white font-semibold tracking-wide text-lg">
            <span className="font-bold">RED</span> PRODUCT
          </h1>
        </div>

        {/* Formulaire */}
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-md shadow-xl p-6 sm:p-8">
          <h2 className="text-gray-800 font-medium mb-3 text-sm sm:text-base text-center">
            Nouveau mot de passe
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm mb-6 text-center">
            Entrez votre nouveau mot de passe ci-dessous.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nouveau mot de passe */}
            <div className="text-left">
              <label className="block text-xs sm:text-sm text-gray-500 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                name="new_password"
                required
                minLength={8}
                value={formData.new_password}
                onChange={handleChange}
                className="w-full border-0 border-b border-gray-300 py-2 text-sm focus:outline-none focus:ring-0 focus:border-gray-700"
                placeholder="••••••••"
              />
            </div>

            {/* Confirmer mot de passe */}
            <div className="text-left">
              <label className="block text-xs sm:text-sm text-gray-500 mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="re_new_password"
                required
                minLength={8}
                value={formData.re_new_password}
                onChange={handleChange}
                className="w-full border-0 border-b border-gray-300 py-2 text-sm focus:outline-none focus:ring-0 focus:border-gray-700"
                placeholder="••••••••"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base disabled:bg-gray-400"
            >
              {loading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
            </button>
          </form>
        </div>

        {/* Lien retour */}
        <div className="mt-6 text-center text-xs sm:text-sm">
          <Link
            to="/login"
            className="text-yellow-500 hover:text-yellow-600 transition"
          >
            Revenir à la <span className="text-yellow-500">connexion</span>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;