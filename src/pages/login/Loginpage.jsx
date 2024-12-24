import React, { useEffect, useState } from "react";
import { useLogin } from "@refinedev/core";
import { Button, Card, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./loginpage.css"; 

const API_URL = import.meta.env.VITE_SERVER_URL;
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const Base_Url = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isLoading } = useLogin();

  useEffect(() => {
    if (localStorage.getItem("jwt-token")) navigate("/dashboard");
  }, []);

  const handleUserId = (e) => setUserId(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: userid, password: password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(TOKEN_KEY, data.jwt);
        localStorage.setItem("userid", String(data?.user?.id));
        localStorage.setItem("userstatus", String(data?.user?.userstatus));
        localStorage.setItem("emeelanrole", String(data?.user?.emeelanrole));
        navigate("/dashboard");
      } else {
        const errorData = await res.json();
        notification.error({
          message: "Login Failed",
          description: errorData?.message || "Invalid Credential.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <div className="login-page">
      <img src="/profession.png" className="background-image" alt="Background" />
      <div className="login-container">
        <Card className="login-card">
          <div className="login-content">
            <div className="brand-header">
              <div className="logo-container">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="logo"
                />
              </div>
              <div className="brand-text">
                <p className="brand-name">EMEELAN</p>
                <p className="brand-subtitle">गठजोड़</p>
              </div>
            </div>
            
            <div className="login-form-container">
              <form
                className="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <div className="form-content">
                  <h1 className="welcome-text">Welcome To EMEELAN</h1>
                  <h2 className="welcome-subtitle">गठजोड़</h2>
                  
                  <div className="form-field">
                    <label>Email or Mobile Number</label>
                    <Input
                      id="input-username"
                      placeholder="Enter your Email or Mobile Number"
                      onChange={handleUserId}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="form-field">
                    <label>Password</label>
                    <Input.Password
                      id="input-pass"
                      placeholder="Enter your Password"
                      onChange={handlePassword}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="form-actions">
                    <Button 
                      id="btnK" 
                      htmlType="submit" 
                      onClick={handleLogin} 
                      loading={isLoading}
                      className="login-button"
                    >
                      LOGIN
                    </Button>
                    
                    <div className="signup-prompt">
                      <span>Don't have an account?</span>
                      <span
                        className="signup-link"
                        onClick={() => navigate("/register")}
                      >
                        {" "}
                        Sign Up{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;