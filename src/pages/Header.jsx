import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,

} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useOne } from "@refinedev/core";
import { CaretRightOutlined, UserOutlined } from "@ant-design/icons";

const Header = () => {
  const userid = localStorage.getItem("userid");
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the clicked element as anchor
  };
 
   
  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };
  const navigate = useNavigate();
  const logo = "/emeelan_logo.jpg";
  const {data, isLoading} = useOne({
    resource: "users",
    id: String(userid),
    meta: {
      populate: ["profilePicture", "vyaapar"],
    },
  })
  const user = data?.data;
  // console.log("logo",Logo)
  console.log("Data for header ",user)
  if (isLoading){
    return <p>Loading...</p>;
  }

  

  return (
    <div className="dashboard-container"  style={{
      padding: "0.5rem 1rem", // Reduced padding for the brown bar
      backgroundColor: "#333", // Ensure the brown bar (background color) stays consistent
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
    <div className="dashboard-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {/* Logo and App Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} onClick={() => navigate(`/dashboard}`)}>
        <div style={{ textAlign: "center" }}>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "3rem", height: "3rem", objectFit: "contain" }}
          />
          <div style={{ color: "white", marginTop: "0.5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.0rem" }}>EMeelan</h2>
           
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/hcmcard/${userid}`)}
       // onClick={() => navigate(`/hcmcard/${userid}`)}

      >
        <Avatar src={user?.profilePicture?.formats?.thumbnail?.url || "/default-profile.png"} size={64} icon={<UserOutlined />} />
          
        
        <div style={{ color: "white" }} className="dashboard-username">
          {user?.username}
          <CaretRightOutlined />
        </div>
      </div>
    </div>
  </div>
  );
};

export default Header;
