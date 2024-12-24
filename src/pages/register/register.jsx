import React, { useState } from "react";
import { useCreate } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

import "./k1register.css"; 


import {
  Button,
  Card,
  Form,
  Input,
  DatePicker,
  Select,
  notification,
  Space
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Country, State } from "country-state-city";
import gotra from "../../utils/gotra.json";

const { Option } = Select;

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const API_URL = import.meta.env.VITE_SERVER_URL;

export const RegisterPage = ({ userrole, createdBy }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      values['username'] = values['email'];
      values['userstatus'] = 'PENDING';
      
      const res = await fetch(`${API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem(TOKEN_KEY, data.jwt);
        localStorage.setItem("userid", String(data?.user?.id));
        localStorage.setItem("userstatus", String(data?.user?.userstatus));
        navigate("/dashboard");
      } else {
        notification.error({
          message: "Registration Failed",
          description: data.message || "Something went wrong",
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
    <div className="register-page">
      <img src="/profession.png" className="background-image" alt="Background" />
      <div className="register-container">
        <Card className="register-card">
          <div className="register-content">
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

            <div className="register-form-container">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="register-form"
              >
                <h1 className="welcome-text">Create Your Account</h1>
                <h2 className="welcome-subtitle">Join EMEELAN Today</h2>

                <div className="form-grid">
                  <Form.Item
                    name="firstname"
                    label="First Name"
                    rules={[{ required: true, message: "Enter your first name" }]}
                  >
                    <Input 
                      prefix={<UserOutlined />}
                      placeholder="Enter First Name" 
                    />
                  </Form.Item>

                  <Form.Item
                    name="lastname"
                    label="Father/Husband Name"
                    rules={[{ required: true, message: "Enter your Father/Husband name" }]}
                  >
                    <Input 
                      prefix={<UserOutlined />}
                      placeholder="Enter Father/Husband Name" 
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Enter Email Address"
                    />
                  </Form.Item>

                  <Form.Item
                    name="mobile"
                    label="Mobile Number"
                    rules={[{ required: true, message: 'Please enter your mobile number' }]}
                  >
                    <Input placeholder="Enter Mobile Number" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                      { min: 6, message: "Password must be at least 6 characters long" },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Enter Password"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Please confirm your password" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Passwords do not match");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Confirm Password"
                    />
                  </Form.Item>

                  <Form.Item
                    name="dob"
                    label="Date of Birth"
                    rules={[{ required: true, message: "Please select your date of birth" }]}
                  >
                    <DatePicker
                      className="w-full"
                      format="DD/MM/YYYY"
                      placeholder="Select Date of Birth"
                    />
                  </Form.Item>

                  <Form.Item
                    name="sex"
                    label="Gender"
                    rules={[{ required: true, message: "Please select your gender" }]}
                  >
                    <Select placeholder="Select Gender">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="gotra"
                    label="Gotra"
                    rules={[{ required: true, message: "Please select your gotra" }]}
                    className="gotra-select"
                  >
                    <Select
                      placeholder="Select Your Gotra"
                      showSearch
                      optionFilterProp="label"
                    >
                      {gotra.Gotra.map((g) => (
                        <Option key={g.EName} value={g.EName} label={g.EName}>
                          {g.EName} ({g.HName})
                        </Option>
                      ))}
                      <Option value="Other" label="Other">
                        Other
                      </Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="form-actions">
                  <Button type="primary" htmlType="submit" className="submit-button">
                    Register
                  </Button>
                  <Button onClick={() => navigate("/login")} className="back-button">
                    Back to Login
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;