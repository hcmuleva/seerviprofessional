import React, { useState } from "react";
import {
  Layout,
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Tabs,
  Row,
  Col,
  Typography,
  Progress,
  notification,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { City, Country, State } from "country-state-city";
import gotra from "../../utils/gotra.json";
import "../../styles/register.css";
import { useCreate } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const API_URL = import.meta.env.VITE_SERVER_URL;

export const RegisterPage = ({ userrole, createdBy }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const { mutate: createUser } = useCreate();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      values["org"] = "SEERVI";
      values["username"] = values["MobileNumber"];
      values["email"] = values["email"]
        ? values["email"]
        : `${values["MobileNumber"]}@hph.com`;
      values["role"] = 1;
      createUser(
        { resource: "users", values },
        {
          onSuccess: async () => {
            try {
              const res = await fetch(`${API_URL}/api/auth/local`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  identifier: values.email,
                  password: values.password,
                }),
              });

              if (res.ok) {
                const logindata = await res.json();
                localStorage.setItem(TOKEN_KEY, logindata.jwt);
                localStorage.setItem("userid", logindata.user.id);
                navigate("/dashboard");
              } else {
                const errorData = await res.json();
                notification.error({
                  message: "Login Failed",
                  description: errorData.message || "Error logging in.",
                });
              }
            } catch (error) {
              notification.error({
                message: "Error",
                description: "Something went wrong during login.",
              });
            }
          },
        }
      );
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong during registration.",
      });
    }
  };

  const handleTabChange = (activeKey) => setCurrentStep(Number(activeKey));

  const handleCountry = (option) => {
    const selectedCountry = Country.getAllCountries().find(
      (country) => country.name === option
    );
    setCountry({ code: selectedCountry.isoCode, name: option });
    setState({}); // Clear selected state
    form.setFieldsValue({ State: undefined, City: undefined }); // Clear state and city fields
  };

  const handleState = (option) => {
    const selectedState = State.getStatesOfCountry(country.code).find(
      (state) => state.name === option
    );
    setState({ code: selectedState.isoCode, name: option });
    form.setFieldsValue({ City: undefined }); // Clear city field
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #2c3e50 0%, #34495e 99%, #34495e 100%)", // Dark blue gradient
      }}
    >
      <Content style={{ padding: "40px 0" }}>
        <Card
          style={{
            maxWidth: 800,
            margin: "0 auto",
            borderRadius: 15,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Title
              level={2}
              style={{
                background:
                  "linear-gradient(135deg, #2c3e50 0%, #34495e 99%, #34495e 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent", // Transparent to show gradient
                marginBottom: 0,
              }}
            >
              EMEELAN
            </Title>
            <Text style={{ display: "block", fontSize: "1.2rem" }}>
              We bring Professionals Together
            </Text>
          </div>

          <Progress
            percent={(currentStep / 3) * 100}
            showInfo={false}
            strokeColor="linear-gradient(135deg, #2c3e50 0%, #34495e 99%, #34495e 100%)" // Match the background gradient
            style={{ marginBottom: "1rem" }}
          />

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Tabs defaultActiveKey="1" onChange={handleTabChange}>
              {/* Personal Info Tab */}
              <Tabs.TabPane
                tab={
                  <span>
                    <UserOutlined />
                    Personal Info
                  </span>
                }
                key="1"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="FirstName"
                      label="First Name"
                      rules={[
                        { required: true, message: "Enter your first name" },
                      ]}
                    >
                      <Input placeholder="Enter First Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="LastName"
                      label="Last Name"
                      rules={[
                        { required: true, message: "Enter your last name" },
                      ]}
                    >
                      <Input placeholder="Enter Last Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password",
                        },
                        {
                          min: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Enter Password"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("The two passwords do not match")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                  </Col>
                </Row>
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
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="DOB"
                      label="Date of Birth"
                      rules={[
                        {
                          required: true,
                          message: "Please select your date of birth",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                        placeholder="Select Date of Birth"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="Sex"
                      label="Sex"
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender",
                        },
                      ]}
                    >
                      <Select placeholder="Select Sex">
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="Gotra"
                  label="Gotra"
                  rules={[
                    { required: true, message: "Please select your gotra." },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
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
                <Form.Item name="MobileNumber" label="Mobile Number"  rules={[{ required: true, message: 'Please enter your mobile number' }]}>
                  <Input placeholder="Enter Mobile Number" />
                </Form.Item>
              </Tabs.TabPane>

              {/* Address Info Tab */}
              <Tabs.TabPane
                tab={
                  <span>
                    <BookOutlined />
                    Address Info
                  </span>
                }
                key="2"
              >
                <Form.Item name="Address" label="Home Address">
                  <Input.TextArea placeholder="Enter Home Address" />
                </Form.Item>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="Country"
                      label="Country"
                      rules={[
                        { required: true, message: "Please Enter Country" },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select Your Country"
                        showSearch
                        onChange={handleCountry}
                      >
                        {Country.getAllCountries().map((country) => (
                          <Option key={country.isoCode} value={country.name}>
                            {country.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="State"
                      label="State"
                      rules={[
                        { required: true, message: "Please Enter State" },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select State"
                        onChange={handleState}
                        showSearch
                        disabled={!country.code}
                      >
                        {State.getStatesOfCountry(country.code).map((state) => (
                          <Option key={state.isoCode} value={state.name}>
                            {state.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="City"
                      label="City"
                      rules={[{ required: true, message: "Please Enter City" }]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select Your City"
                        showSearch
                        disabled={!state.code}
                      >
                        {City.getCitiesOfState(country.code, state.code).map(
                          (city) => (
                            <Option key={city.name} value={city.name}>
                              {city.name}
                            </Option>
                          )
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="postalcode" label="Pin Code">
                      <Input placeholder="Enter Pin Code" />
                    </Form.Item>
                  </Col>
                </Row>
              </Tabs.TabPane>

              {/* Profession Tab */}
              <Tabs.TabPane
                tab={
                  <span>
                    <BookOutlined />
                    Profession
                  </span>
                }
                key="3"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="Profession" label="Profession">
                      <Input placeholder="Enter Profession" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="CompanyName" label="Company Name">
                      <Input placeholder="Enter Company Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="Designation" label="Designation">
                      <Input placeholder="Enter Designation" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="WorkingCity" label="Working City">
                      <Input placeholder="Enter Working City" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="Income" label="Income">
                      <Input placeholder="Enter Income" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="PreProfession" label="Previous Profession">
                      <Input placeholder="Enter Previous Profession" />
                    </Form.Item>
                  </Col>
                </Row>
              </Tabs.TabPane>
            </Tabs>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};
