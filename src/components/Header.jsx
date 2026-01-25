// import React, { useEffect, useState } from "react";
// import { Menu, Search, Bell, LogOut, Camera } from "lucide-react";
// import { useLocation } from "react-router-dom";
// import { useSidebar } from "../context/SidebarContext";
// import { useAuth } from "../context/AuthContext"; 
// import { logout as apiLogout, updateProfileImage } from "../api/api.js"; 

// const Header = () => {
//   const { setOpen } = useSidebar();
//   const { user, logout: logoutContext, setUser } = useAuth(); // ajout setUser pour maj
//   const location = useLocation();

//   const [notifications, setNotifications] = useState([]);
//   const [avatar, setAvatar] = useState(user?.imageprofil || "/default-profil.jpg");

//   // Titres des pages
//   const titles = {
//     "/dashboard": "Dashboard",
//     "/hotels": "Liste des hôtels",
//   };

//   // Notifications statiques
//   useEffect(() => {
//     const staticNotifications = [
//       { id: 1, message: "Bienvenue sur votre dashboard", read_at: null },
//       { id: 2, message: "Nouvel hôtel ajouté", read_at: null },
//     ];
//     setNotifications(staticNotifications);
//   }, []);

//   const unreadCount = notifications.filter((n) => !n.read_at).length;

//   // Marquer notification comme lue (state local)
//   const handleMarkRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read_at: new Date() } : n))
//     );
//   };

//   // Déconnexion sécurisée
//  const handleLogout = async () => {
//   try {
//     await apiLogout();
//   } catch (error) {
//     console.error("Erreur logout:", error);
//   } finally {
//     logoutContext(); // supprime token + met user à null
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//   }
// };

//   // Changer photo de profil
//  const handleChangeAvatar = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("imageprofil", file);

//   try {
//     const res = await updateProfileImage(formData);
//     const newAvatar = res.data.imageprofil.startsWith("http")
//       ? res.data.imageprofil
//       : `http://127.0.0.1:8000/media/${res.data.imageprofil}`;
//     setAvatar(newAvatar);

//     // mise à jour du contexte
//     setUser({ ...user, imageprofil: res.data.imageprofil });
//   } catch (err) {
//     console.error("Erreur upload avatar:", err);
//   }
// };

//   // Met à jour avatar si user change
//   useEffect(() => {
//     if (user?.imageprofil) {
//       setAvatar(`http://127.0.0.1:8000/media/${user.imageprofil}`);
//     } else {
//       setAvatar("/default-profil.jpg");
//     }
//   }, [user]);

//   const handleProfileClick = () => {
//     console.log("Profil utilisateur :", user); 
//   };

//   return (
//     <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white border-b border-gray-300">
      
//       {/* Left side */}
//       <div className="flex items-center gap-3">
//         <button onClick={() => setOpen(true)} className="md:hidden text-gray-600">
//           <Menu size={22} />
//         </button>

//         <div>
//           <h1 className="text-gray-800 font-semibold text-lg">
//             {titles[location.pathname] || "Dashboard"}
//           </h1>
//           <p className="text-sm text-gray-500 hidden sm:block">
//             Gestion de votre application
//           </p>
//         </div>
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-3 md:gap-4">

//         {/* Search */}
//         <div className="relative hidden md:block">
//           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Recherche"
//             className="pl-9 pr-3 py-1.5 border rounded-md text-sm"
//           />
//         </div>

//         {/* Notifications */}
//         <div className="relative">
//           <Bell size={20} className="text-gray-600 cursor-pointer" />
//           {unreadCount > 0 && (
//             <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
//               {unreadCount}
//             </span>
//           )}
//           <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
//             {notifications.length === 0 ? (
//               <p className="p-2 text-sm text-gray-500">Aucune notification</p>
//             ) : (
//               notifications.map((n) => (
//                 <div
//                   key={n.id}
//                   className={`p-2 text-sm cursor-pointer ${!n.read_at ? "bg-gray-100 font-medium" : ""}`}
//                   onClick={() => handleMarkRead(n.id)}
//                 >
//                   {n.message}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Profil */}
//         <div className="relative">
//           <img
//             src={avatar}
//             alt="user"
//             className="w-9 h-9 rounded-full cursor-pointer"
//             onClick={handleProfileClick}
//           />
//           {/* Input invisible pour changer l'image */}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleChangeAvatar}
//             className="absolute w-9 h-9 top-0 left-0 opacity-0 cursor-pointer rounded-full"
//           />
//           <Camera
//             size={16}
//             className="absolute bottom-0 right-0 text-gray-500 bg-white rounded-full p-0.5"
//           />
//         </div>

//         {/* Logout */}
//         <button onClick={handleLogout} title="Déconnexion">
//           <LogOut size={18} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import { Menu, Search, Bell, LogOut, Camera } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";
import { logout as apiLogout, updateProfileImage } from "../api/api.js";

const Header = () => {
  const { setOpen } = useSidebar();
  const { user, logout: logoutContext, setUser } = useAuth();
  const location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [avatar, setAvatar] = useState(
    user?.imageprofil ? `https://django-gestion-hotel.onrender.com/media/${user.imageprofil}` : "/default-profil.jpg"
  );

  // Titres des pages
  const titles = {
    "/dashboard": "Dashboard",
    "/hotels": "Liste des hôtels",
  };

  // Notifications statiques
  useEffect(() => {
    const staticNotifications = [
      { id: 1, message: "Bienvenue sur votre dashboard", read_at: null },
      { id: 2, message: "Nouvel hôtel ajouté", read_at: null },
    ];
    setNotifications(staticNotifications);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read_at: new Date() } : n))
    );
  };

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Erreur logout:", error);
    } finally {
      logoutContext(); // supprime token et met user à null
    }
  };

  // Changer photo de profil
const handleChangeAvatar = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("imageprofil", file);

  try {
    const res = await updateProfileImage(formData); 
    
    const newAvatar = res.data.imageprofil.startsWith("http")
      ? res.data.imageprofil
      : `https://django-gestion-hotel.onrender.com${res.data.imageprofil}`; 

    setAvatar(newAvatar);

    if (setUser) {
      setUser({ ...user, imageprofil: newAvatar });
    }
  } catch (err) {
    console.error("Erreur upload avatar:", err);
  }
};


  // Met à jour l'avatar si user change (ex: login ou update image)
  useEffect(() => {
    if (user?.imageprofil) {
      setAvatar(`https://django-gestion-hotel.onrender.com/media/${user.imageprofil}`);
    } else {
      setAvatar("/default-profil.jpg");
    }
  }, [user]);

  const handleProfileClick = () => {
    console.log("Profil utilisateur :", user);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white border-b border-gray-300">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={() => setOpen(true)} className="md:hidden text-gray-600">
          <Menu size={22} />
        </button>
        <div>
          <h1 className="text-gray-800 font-semibold text-lg">
            {titles[location.pathname] || "Dashboard"}
          </h1>
          <p className="text-sm text-gray-500 hidden sm:block">Gestion de votre application</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Recherche"
            className="pl-9 pr-3 py-1.5 border rounded-md text-sm"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
  <Bell size={20} className="text-gray-600 cursor-pointer" />
  {unreadCount > 0 && (
    <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
      {unreadCount}
    </span>
  )}
</div>

        {/* Profil */}
        <div className="relative">
          <img
            src={avatar}
            alt="user"
            className="w-9 h-9 rounded-full cursor-pointer"
            onClick={handleProfileClick}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeAvatar}
            className="absolute w-9 h-9 top-0 left-0 opacity-0 cursor-pointer rounded-full"
          />
          <Camera
            size={16}
            className="absolute bottom-0 right-0 text-gray-500 bg-white rounded-full p-0.5"
          />
        </div>

        {/* Logout */}
        <button onClick={handleLogout} title="Déconnexion">
          <LogOut size={18} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
        </button>
      </div>
    </header>
  );
};

export default Header;

