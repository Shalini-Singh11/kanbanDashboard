import React, { useState } from "react";
// MUI Components ===========================
import { Box } from "@mui/material";
// Layout header & sidebar ===========================
import Header from "../headerLayout/Header";
import Sidebar from "../sidebarLayout/Sidebar";
// react-router-dom ===========================
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  // ===================For toggleDrawer ===================
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // =================== clear user data from local storage ===================
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("Token");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* =================== For SIdebar =================== */}
      <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      {/* =================== SIdebar end =================== */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          transition: "margin 0.3s",
          marginLeft: drawerOpen ? "0px" : "0px",
          overflow: "hidden",
        }}
      >
        {/* =================== For Header =================== */}
        <Header onToggleDrawer={toggleDrawer} onLogout={handleLogout} />
        {/* =================== Header End =================== */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 3,
            height: "calc(100vh - 4px)",
          }}
        >
          {/* ========= render child route elements =============== */}
          <Outlet />
          {/* ========= Outlet end =============== */}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
