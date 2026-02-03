import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Activate = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.post(
          "https://django-gestion-hotel.onrender.com/api/auth/users/activation/",
          { uid, token }
        );

        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        console.error("Activation error:", error.response?.data || error);
        setStatus("error");
      }
    };

    if (uid && token) {
      activateAccount();
    }
  }, [uid, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Activation en cours...</h2>
            <p className="text-gray-600">Veuillez patienter</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Compte activé !
            </h2>
            <p className="text-gray-600">
              Redirection vers la page de connexion...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Erreur d’activation
            </h2>
            <p className="text-gray-600 mb-4">
              Le lien est invalide ou expiré.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Retour à la connexion
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Activate;
