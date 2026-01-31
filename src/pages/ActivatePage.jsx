import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ActivatePage = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState("Activation en cours...");

  useEffect(() => {
    axios.post("https://django-gestion-hotel-1.onrender.com/api/auth/users/activation/", {
      uid,
      token,
    })
    .then((res) => setMessage("Compte activé avec succès ! Vous pouvez maintenant vous connecter."))
    .catch((err) => setMessage("Erreur lors de l’activation. Le lien est peut-être expiré."));
  }, [uid, token]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default ActivatePage;
