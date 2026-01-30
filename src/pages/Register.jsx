// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthLayout from "../components/AuthLayout";
// import { register } from "../api/api"; 

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError(""); // reset erreur

//   try {
//     await register(formData);
//     alert("Inscription réussie !");
//     navigate("/");
//   } catch (error) {
//     console.log("ERREUR Django :", error.response?.data);

//     const data = error.response?.data;

//     if (data?.username) {
//       setError(data.username[0]);
//     } else if (data?.email) {
//       setError(data.email[0]);
//     } else if (data?.password) {
//       setError(data.password[0]);
//     } else {
//       setError("Erreur lors de l'inscription");
//     }
//   }
// };


//   return (
//     <AuthLayout>
//       {/* Logo */}
//       <div className="mb-5 text-center">
//         <h1 className="text-white font-bold tracking-wide text-lg">
//           RED PRODUCT
//         </h1>
//       </div>

//       {/* Form container */}
//       <div className="w-full bg-white rounded-md shadow-xl p-6 sm:p-8 text-center">
//         <h2 className="text-[#494C4F] mb-5 text-sm sm:text-base">
//           Inscrivez-vous en tant que <span className="font-semibold">Admin</span>
//         </h2>
// {error && (
//   <div className="mb-4 text-red-600 text-xs sm:text-sm text-center">
//     {error}
//   </div>
// )}

//         {/* Form */}
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {/* Nom */}
//           <div className="text-left">
//             <label className="block text-xs sm:text-sm text-gray-400 mb-1">
//               Nom
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full border-0 border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-gray-700"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="text-left">
//             <label className="block text-xs sm:text-sm text-gray-400 mb-1">
//               E-mail
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border-0 border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-gray-700"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="text-left">
//             <label className="block text-xs sm:text-sm text-gray-400 mb-1">
//               Mot de passe
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border-0 border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-gray-700"
//               required
//             />
//           </div>

//           {/* Terms */}
//           <div className="flex items-center text-xs sm:text-sm text-gray-600">
//             <input type="checkbox" className="mr-2 accent-gray-800" required />
//             Accepter les termes et la politique
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base"
//           >
//             S inscrire
//           </button>
//         </form>
//       </div>

//       {/* Footer link */}
//       <div className="mt-6 text-xs sm:text-sm text-white text-center">
//         Vous avez déjà un compte ?{" "}
//         <Link to="/" className="text-yellow-500 hover:underline">
//           Se connecter
//         </Link>
//       </div>
//     </AuthLayout>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { register } from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);

      alert(
        "Inscription réussie \nVeuillez vérifier votre email pour activer votre compte."
      );

      navigate("/");
    } catch (err) {
      console.log("Erreur Django :", err.response?.data);

      const data = err.response?.data;

      if (data?.email) {
        setError(data.email[0]);
      } else if (data?.username) {
        setError(data.username[0]);
      } else if (data?.password) {
        setError(data.password[0]);
      } else if (data?.non_field_errors) {
        setError(data.non_field_errors[0]);
      } else {
        setError("Erreur lors de l'inscription");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Logo */}
      <div className="mb-5 text-center">
        <h1 className="text-white font-bold tracking-wide text-lg">
          RED PRODUCT
        </h1>
      </div>

      {/* Form container */}
      <div className="w-full bg-white rounded-md shadow-xl p-6 sm:p-8 text-center">
        <h2 className="text-[#494C4F] mb-5 text-sm sm:text-base">
          Inscrivez-vous en tant que <span className="font-semibold">Admin</span>
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-xs sm:text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="text-left">
            <label className="block text-xs sm:text-sm text-gray-400 mb-1">
              Nom d’utilisateur
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-0 border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="block text-xs sm:text-sm text-gray-400 mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-0 border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="text-left">
            <label className="block text-xs sm:text-sm text-gray-400 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-0 border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-gray-700"
              required
              minLength={8}
            />
          </div>

          {/* Terms */}
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <input type="checkbox" className="mr-2 accent-gray-800" required />
            Accepter les termes et la politique
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base disabled:opacity-50"
          >
            {loading ? "Inscription..." : "S’inscrire"}
          </button>
        </form>
      </div>

      {/* Footer link */}
      <div className="mt-6 text-xs sm:text-sm text-white text-center">
        Vous avez déjà un compte ?{" "}
        <Link to="/" className="text-yellow-500 hover:underline">
          Se connecter
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
