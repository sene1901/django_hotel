import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HotelList from "./pages/HotelList";
import Register from "./pages/Register";
import ActivatePage from "./pages/ActivatePage";

import MotDePasseOublie from "./pages/MotDePasseOublie";
import Layout from "./components/Layout"; 
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route path="/activate/:uid/:token" element={<ActivatePage />} />
      <Route path="/forgot-password" element={<MotDePasseOublie />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Redirection root */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Pages privées */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels" element={<HotelList />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
