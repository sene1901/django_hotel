import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../api/api"; // ton API axios

const ResetPassword = () => {
  const { token } = useParams(); // token depuis l'URL
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // email depuis l'URL

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      alert("Mot de passe réinitialisé ! Vous pouvez vous connecter.");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la réinitialisation.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button type="submit">Réinitialiser</button>
    </form>
  );
};

export default ResetPassword;
