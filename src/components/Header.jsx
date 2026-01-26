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
  
  // Récupère l'URL de l'image depuis Cloudinary
  const getAvatarUrl = () => {
    if (user?.imageprofil_url) return user.imageprofil_url;
    if (user?.imageprofil && typeof user.imageprofil === 'string') {
      // Si imageprofil contient déjà l'URL complète Cloudinary
      if (user.imageprofil.startsWith('http')) return user.imageprofil;
    }
    return "/default-profil.jpg";
  };

  const [avatar, setAvatar] = useState(getAvatarUrl());

  const titles = {
    "/dashboard": "Dashboard",
    "/hotels": "Liste des hôtels",
  };

  useEffect(() => {
    setNotifications([
      { id: 1, message: "Bienvenue sur votre dashboard", read_at: null },
      { id: 2, message: "Nouvel hôtel ajouté", read_at: null },
    ]);
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
      logoutContext();
    }
  };

  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imageprofil", file);

    try {
      const res = await updateProfileImage(formData);
      
      // Le backend retourne soit imageprofil_url, soit imageprofil
      const newAvatarUrl = res.data.imageprofil_url || res.data.imageprofil;
      
      if (newAvatarUrl) {
        setAvatar(newAvatarUrl);
        
        if (setUser) {
          setUser({ 
            ...user, 
            imageprofil_url: newAvatarUrl,
            imageprofil: newAvatarUrl 
          });
        }
      }
    } catch (err) {
      console.error("Erreur upload avatar:", err.response?.data || err.message);
      alert("Erreur lors de l'upload de l'image");
    }
  };

  // Met à jour avatar si user change
  useEffect(() => {
    setAvatar(getAvatarUrl());
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
            alt="Profile"
            className="w-9 h-9 rounded-full cursor-pointer object-cover"
            onClick={handleProfileClick}
            onError={(e) => e.target.src = "/default-profil.jpg"}
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