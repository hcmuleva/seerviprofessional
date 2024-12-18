import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography, Avatar, Menu, MenuItem, Divider, IconButton, Button, useMediaQuery } from "@mui/material";
import { CaretRightOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
// import { useTheme } from "@mui/material/styles";
import { useOne, useSaveButton } from "@refinedev/core";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const [isHome, setIsHome] = useState(() => {
    return localStorage.getItem("isHome") === "false" ? false : true;
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // Save the current state to localStorage whenever it changes
    localStorage.setItem("isHome", isHome);
  }, [isHome]);

  const [roleAnchorEl, setRoleAnchorEl] = useState(null);
  const userid = localStorage.getItem("userid");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAvatarMenuClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarAnchorEl(null);
  };

  const handleRoleMenuClick = (event) => {
    setRoleAnchorEl(event.currentTarget);
  };

  const handleRoleMenuClose = () => {
    setRoleAnchorEl(null);
  };
  const logo = "/emeelan_logo.jpg";
  const {data, isLoading} = useOne({
    resource: "users",
    id: String(userid),
    meta: {
      populate: ["profilePicture", "vyaapar"],
    },
  })
  const user = data?.data;

  const handleLogout = () => {4
    localStorage.clear()
    navigate("./login");
  }
  // console.log("logo",Logo)
  console.log("Data for header ",user)
  if (isLoading){
    return <p>Loading...</p>;
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#333", boxShadow: 2, paddingTop:"10px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left Side: Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap:"1rem" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: "text.primary", textAlign:"center" }}>
            <img src="/logo.png" alt="Logo" style={{ width: "40px", height: "40px" }} />
            <div style={{ color: "white", marginTop: "0.5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.0rem" }}>EMeelan</h2>
          </div>
          </Typography>
        </Box>

        {/* Right Side: Role Button, Avatar & Dropdowns */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Role Button */}
          {isHome ?
          <Button
            variant="outlined"
            color="white"
            size={isMobile ? "small" : "medium"}
            onClick={() => {navigate(`/hcmcard/${userid}`); setIsHome(false)}}
            sx={{
              textTransform: "capitalize",
              fontSize: isMobile ? "0.8rem" : "1rem",
              padding: isMobile ? "4px 8px" : "6px 12px",
              border:"none"
            }}
          >
            Profile
          </Button>
          :
          <Button
            variant="outlined"
            color="white"
            size={isMobile ? "small" : "medium"}
            onClick={() => {navigate(`/dashboard`);setIsHome(true)}}
            sx={{
              textTransform: "capitalize",
              fontSize: isMobile ? "0.8rem" : "1rem",
              padding: isMobile ? "4px 8px" : "6px 12px",
              border:"none"
            }}
          >
            Home
          </Button>
          }
          <Button
            variant="outlined"
            color="white"
            hover="green"
            size={isMobile ? "small" : "medium"}
            onClick={handleRoleMenuClick}
            sx={{
              textTransform: "capitalize",
              fontSize: isMobile ? "0.8rem" : "1rem",
              padding: isMobile ? "4px 8px" : "6px 12px",
              border:"none"
            }}
          >
            Role
          </Button>

          {/* Role Dropdown Menu */}
          <Menu
            anchorEl={roleAnchorEl}
            open={Boolean(roleAnchorEl)}
            onClose={handleRoleMenuClose}
            sx={{
              "& .MuiMenu-paper": {
                minWidth: 180,
              },
            }}
          >
            <MenuItem onClick={handleRoleMenuClose}>User</MenuItem>
            <MenuItem onClick={handleRoleMenuClose}>Central</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          {/* Avatar */}
          <Avatar
            alt="User Avatar"
            src={user?.profilePicture?.formats?.thumbnail?.url || "/default-profile.png"}
            sx={{ width: 40, height: 40, cursor: "pointer" }}
          />

          {/* Avatar Dropdown Menu */}
          <Menu
            anchorEl={avatarAnchorEl}
            open={Boolean(avatarAnchorEl)}
            onClose={handleAvatarMenuClose}
            sx={{
              "& .MuiMenu-paper": {
                minWidth: 200,
              },
            }}
          >
            <MenuItem onClick={handleAvatarMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleAvatarMenuClose}>Account Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleAvatarMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
