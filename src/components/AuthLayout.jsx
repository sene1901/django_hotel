import React from "react";
import { Outlet } from "react-router-dom";
import bgImage from "../assets/images/bg.jpg"; 

const AuthLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-gray-800"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-[#494C4F] opacity-80"></div>

      {/* Contenu centré */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
