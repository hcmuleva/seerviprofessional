import React from "react";

import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export default function Controller() {
    console.log("Controller called ")
    const navigate = useNavigate();
    const userState = localStorage.getItem("userstatus");
    const userRole = localStorage.getItem("emeelanrole");
    const token = localStorage.getItem(TOKEN_KEY);
    const userid = localStorage.getItem('userid')
    
    return (<UserDashboard/>)
    
  
}
