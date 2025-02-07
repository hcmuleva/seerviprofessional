import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";

const API_URL = process.env.VITE_SERVER_URL;
const TOKEN_KEY = process.env.VITE_TOKEN_KEY;
const USER_ROLE = process.env.VITE_USERROLE;
const USER_STATUS = process.env.VITE_USERSTATUS;
export const axiosInstance = axios.create();
const strapiAuthHelper = AuthHelper(API_URL + "/api");

// Add request interceptor to automatically add token
axiosInstance.interceptors.request.use(
async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Only handle authentication-related errors
    if (error.response?.status === 401) {
      // Check if the error is from an authentication endpoint
      const isAuthEndpoint = error.config.url.includes('/auth/');
      
      // Check if it's a token validation error
      const isTokenError = error.response?.data?.message?.includes('Invalid token') ||
                          error.response?.data?.message?.includes('Token expired');
      
      // Only clear storage if it's actually an authentication issue
      if (isAuthEndpoint || isTokenError) {
        await AsyncStorage.clear();
        // Optionally redirect to login
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export const isAuthenticationError = (error) => {
  return (
    error.response?.status === 401 &&
    (error.response?.data?.message?.includes('Invalid token') ||
     error.response?.data?.message?.includes('Token expired') ||
     error.config.url.includes('/auth/'))
  );
};

export const authProvider = {
  login: async ({
    userid,
    password,
  }) => {
    try {
      const { data, status } = await strapiAuthHelper.login(userid, password);
      if (status == 200) {
        await AsyncStorage.setItem(TOKEN_KEY, data.jwt);
        await AsyncStorage.setItem("userid", String(data?.user?.id));
        await AsyncStorage.setItem("emeelanrole", String(data?.user?.emeelanrole));
        await AsyncStorage.setItem("userstatus",String(data?.user?.userstatus))
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
        
        return {
          success: true,
          redirectTo: "/HomeScreen",
        };

        return { success: true, redirectTo: "/HomeScreen" };
   
      }
    } catch (error) {
      const errorObj = error?.response?.data?.message?.[0]?.messages?.[0];
      return {
        success: false,
        error: {
          message: errorObj?.message || "Login failed",
          id: errorObj?.id || "Invalid userid or password",
          statusCode: 403,
        },
      };  20
      
    }
    return {
      success: false,
      error: {
        message: "Login failed",
        id: "Invalid userid or password",
        statusCode: 403,
      },
    };
  },
  register: async (values) => {
    let email = values.email;
    let username = values.username;
    let password = values.password;

    let commvalues = {
      mobile: values?.MobileNumber,
      firstname: values?.FirstName,
      lastname: values?.LastName,
      gotra: values?.Gotra,
      mother: values?.MotherName,
      father: values?.FatherName,
      dob: values?.DOB,
      marital: values?.MeritalStatus,
      sex: values?.Sex,
      occupation: values?.Profession,
    };

    if (!email) {
      if (values.mobile) {
        email = `${values.mobile}@hph.com`;
      }
      if (values.username) {
        email = `${values.username}@hph.com`;
      }
    }

    if (!username && email) {
      username = email.match(/^([^@]*)@/)[1];
    }
    if (!password) {
      password = "welcome";
    }

    try {
      const response = await axiosInstance.post(
        API_URL + "/api/auth/local/register",
        {
          username: username,
          password: password,
          email: email,
          userstatus: "PENDING",
          ...commvalues,
        }
      );

      const { status, data } = response;
      if (status == 200) {
       await AsyncStorage.setItem(TOKEN_KEY, data?.jwt);
        return {
          success: true,
          redirectTo: "/dashboard",
        };
      
        
      }
    } catch (error) {
      const errorObj = error?.response?.data?.message?.[0]?.messages?.[0];
      return {
        success: false,
        error: {
          message: errorObj?.message || "Register failed",
          id: errorObj?.id || "Invalid email or password",
          statusCode: 403,
        },
      };
    }
    return {
      success: true,
      redirectTo: "/",
    };
  },
  logout: async () => {
    await AsyncStorage.clear();
    axiosInstance.defaults.headers.common["Authorization"] = null;
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    const status = error.response?.status;
    
    if (status === 401 || status === 403) {
     await AsyncStorage.clear();
      return {
        logout: true,
        redirectTo: "/login",
        error: {
          message: "Session expired",
          id: "Unauthorized",
        },
      };
    }

    return { error };
  },

  check: async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    
    if (!token || token === "undefined") {
      return {
        authenticated: false,
        error: {
          message: "Authentication failed",
          id: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    }

    try {
      // Verify token validity by making a request to /me endpoint
      const response = await strapiAuthHelper.me(token);
      if (response.status === 200) {
        return {
          authenticated: true,
        };
      }
    } catch (error) {
     await AsyncStorage.clear();
      return {
        authenticated: false,
        error: {
          message: "Token validation failed",
          id: "Invalid token",
        },
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  
  },
  getPermissions: async () => null,
  getUserIdentity: async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) {
        return null;
    }

    const { data, status } = await strapiAuthHelper.me(token, {
        meta: {
            populate: {
                usermeelan: { populate: { photos: { fields: ["id"] } } },
                likesto: {
                    populate: {
                        usersto: {
                            populate: {
                                usermeelan: {
                                    populate: { photos: { fields: ["id", "url"] } },
                                },
                            },
                        },
                    },
                },
                likesby: {
                    populate: {
                        usersfrom: {
                            populate: {
                                usermeelan: {
                                    populate: { photos: { fields: ["id", "url"] } },
                                },
                            },
                        },
                    },
                },
                requeststo: {
                    populate: {
                        requeststo: {
                            populate: {
                                usermeelan: {
                                    populate: { photos: { fields: ["id", "url"] } },
                                },
                            },
                        },
                    },
                },
                requestby: {
                    populate: {
                        requestsfrom: {
                            populate: {
                                usermeelan: {
                                    populate: { photos: { fields: ["id", "url"] } },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (status == 200) {
        const {
            id,
            username,
            email,
            userstatus,
            emeelanrole,
            likesby,
            likesto,
            requeststo,
            requestsby,
            usermeelan,
        } = data;
       await AsyncStorage.setItem(USER_ROLE, emeelanrole);
       await AsyncStorage.setItem(USER_STATUS, userstatus);
        return {
            userstatus,
            emeelanrole,
            id,
            username,
            email,
            usermeelan,
            likesby,
            likesto,
            requeststo,
            requestsby,
        };
    }
    return null;
},
};