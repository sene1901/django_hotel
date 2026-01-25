import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Page content */}
        <main className="pb-4 md:pb-6 overflow-y-auto">
          {/* L'Outlet rendra la page actuelle (ex: HotelList) */}
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
