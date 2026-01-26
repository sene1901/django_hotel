import React, { useEffect, useState } from "react"; 
import { NavLink } from "react-router-dom";
import { Squares2X2Icon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "../context/SidebarContext";
import bgSidebar from "../assets/images/bg.jpg";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { open, setOpen } = useSidebar();
  const { user } = useAuth();

  // Fonction pour obtenir l'URL de l'avatar
  const getAvatarUrl = () => {
    if (user?.imageprofil_url) return user.imageprofil_url;
    if (user?.imageprofil && typeof user.imageprofil === 'string') {
      // Si imageprofil contient déjà l'URL complète Cloudinary
      if (user.imageprofil.startsWith('http')) return user.imageprofil;
    }
    return "/default-profil.jpg";
  };

  const [avatar, setAvatar] = useState(getAvatarUrl());

  useEffect(() => {
    setAvatar(getAvatarUrl());
  }, [user]);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition
     ${isActive ? "bg-gray-200 text-gray-800" : "text-gray-200 hover:bg-white/20"}`;

  const iconClass = "w-5 h-5";

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-64
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0
          flex flex-col
          bg-cover bg-center
        `}
        style={{ backgroundImage: `url(${bgSidebar})` }}
      >
        {/* Overlay couleur + opacité */}
        <div className="absolute inset-0 bg-[#494C4F]/80" />

        {/* Contenu */}
        <div className="relative flex flex-col h-full text-white">
          {/* Logo */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/20">
            <BookmarkIcon className="w-6 h-6 text-white" />
            <span className="font-semibold tracking-wide">RED PRODUCT</span>
          </div>

          {/* Section */}
          <div className="px-5 py-3 text-xs text-gray-300 uppercase">
            Principal
          </div>

          {/* Menu */}
          <nav className="px-3 space-y-1 text-sm">
            <NavLink
              to="/dashboard"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              <Squares2X2Icon className={iconClass} />
              Dashboard
            </NavLink>

            <NavLink
              to="/hotels"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              <ComputerDesktopIcon className={iconClass} />
              Liste des hôtels
            </NavLink>
          </nav>

          {/* User */}
          <div className="mt-auto px-4 py-4 border-t border-white/20">
            <div className="flex items-center gap-3">
              <img
                src={avatar}
                alt="user"
                className="w-9 h-9 rounded-full cursor-pointer object-cover"
                onError={(e) => e.target.src = "/default-profil.jpg"}
              />

              <div>
                <div className="text-sm font-medium">{user?.username || "Utilisateur"}</div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <span className="text-lg leading-none">●</span> en ligne
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;