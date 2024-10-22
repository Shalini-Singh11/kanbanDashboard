import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import logo from "../../../public/Images/task-management.png";
import { Headertypography } from "./style";

//========================================== MUI Icons =============================
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

// ============================= Sidebar data =============================
const menuData = [
  { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
  { title: "Task Management", to: "/task-management", icon: <AssignmentOutlinedIcon /> },
];

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{ color: "#D9ABAB" }} 
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        width: isCollapsed ? 60 : 240,
        transition: 'width 0.3s',
        // position: 'fixed',
        // zIndex:"99",
        height: '100vh',
        "& .pro-sidebar-inner": {
          backgroundImage: "linear-gradient(to right top, #921a40, #921a40, #921a40, #921a40, #921a40, #962045, #9b2649, #9f2c4e, #a93859, #b34464, #bd506f, #c75b7a) !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 17px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#C75B7A !important",
        },
        "& .pro-menu-item.active": {
          color: "#F4D9D0 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: "#fff" }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              {!isCollapsed && (
                <Typography variant="h6" component="div" sx={Headertypography}>
                  Kanban Dashboard
                </Typography>
              )}
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          </MenuItem>

          {!isCollapsed && (
            <Box
              mb="25px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                component="img"
                width="90px"
                height="70px"
                src={logo}
                alt="Logo"
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {menuData.map((menuItem) => (
              <Item
                key={menuItem.title}
                {...menuItem}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};


export default Sidebar;
