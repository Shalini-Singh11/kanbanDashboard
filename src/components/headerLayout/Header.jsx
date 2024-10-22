import React from "react";
// MUI Components ===========================
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
// MUI Icons ===========================
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout"; 
// style ===========================
import { Headerappbar, IconButtonHeader } from "./style";

const Header = ({ onToggleDrawer, onLogout }) => {
  return (
    <AppBar position="fixed" sx={Headerappbar}>
      <Toolbar>
        {/*============== sidebar toggle  ================ */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onToggleDrawer}
          edge="start"
          sx={IconButtonHeader}
        >
          <MenuIcon />
        </IconButton>
        {/*============== sidebar toggle end ================ */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        </Typography>
        {/*============== Logout Icon ================ */}
        <IconButton
          color="inherit"
          aria-label="logout"
          onClick={onLogout}
        >
          <LogoutIcon />
        </IconButton>
        {/*============== Logout Icon end ================ */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
