import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: process.env.VITE_SERVER_URL,
});

// Add an interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem(process.env.VITE_TOKEN_KEY); // Retrieve the token
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("From Axios mobile",token);
            
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
