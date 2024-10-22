import React, { Suspense, lazy } from "react";
// React Router DOM ==================
import { Route, Routes } from "react-router-dom";
import AllLayout from "../components/Setlayouts/layout";
// Lazy load pages ===================
const Dashboard = lazy(() => import("../pages/dashboardPage/Dashboard"));
const TaskManagement = lazy(() => import("../pages/taskmanagePage/Taskmanage"));
const Login = lazy(() => import("../pages/loginPage/Login"));
const Register = lazy(() => import("../pages/registerPage/Register"));
// Components ========================
import ProtectedRoute from "../components/protectedroute/ProtectedRoute"; 

const MainRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AllLayout />}>
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="task-management" element={
            <ProtectedRoute>
              <TaskManagement />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default MainRouter;


