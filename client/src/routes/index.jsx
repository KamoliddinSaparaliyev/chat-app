import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/core";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";
import ShowMessage from "../components/messages/ShowMessage";
import Login from "../components/Login/Login";

const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages/:room"
          element={
            <ProtectedRoute>
              <ShowMessage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
