import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { forgotPassword } from "../api/api"; 

const MotDePasseOublie = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword({ email });
      setSuccess(true);
    } catch (error) {
      alert(
        error.response?.data?.email?.[0] ||
        error.response?.data?.detail ||
        "Erreur lors de l'envoi de l'email"
      );
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
              Email envoyé !
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.
            </p>
            <Link
              to="/login"
              className="inline-block bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Retour à la connexion
            </Link>
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
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-md shadow-xl p-6 sm:p-8 text-center">
          <h2 className="text-gray-800 font-medium mb-3 text-sm sm:text-base">
            Mot de passe oublié?
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed">
            Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
            instructions sur la façon de modifier votre mot de passe.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="text-left">
              <label className="block text-xs sm:text-sm text-gray-500 mb-1">
                Votre e-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-0 border-b border-gray-300 py-2 text-sm focus:outline-none focus:ring-0 focus:border-gray-700"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base disabled:bg-gray-400"
            >
              {loading ? "Envoi..." : "Envoyer"}
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

export default MotDePasseOublie;