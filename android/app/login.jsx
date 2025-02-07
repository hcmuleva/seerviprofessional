import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { useLogin } from '@refinedev/core';

const API_URL = process.env.VITE_SERVER_URL;
const TOKEN_KEY = process.env.VITE_TOKEN_KEY;

export default function Login() {
  
  const navigation = useNavigation();
  
  const [userid, setUserId] = useState("mani@hph.com");
  const [password, setPassword] = useState("welcome"); // Default password
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isLoading } = useLogin();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        navigation.navigate('Main');
      }
    };
    checkToken();
  }, []);
  

  // useEffect(() => {
  //   if (AsyncStorage.getItem("jwt-token")) navigation.navigate("Testdahboard");
  // }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: userid, password }),
      });
       
      if (res.ok) {
        const data = await res.json()
        
        await AsyncStorage.setItem(TOKEN_KEY, data.jwt);
        await AsyncStorage.setItem('userid', String(data?.user?.id));
        await AsyncStorage.setItem('userstatus', String(data?.user?.userstatus));
        await AsyncStorage.setItem('emeelanrole', String(data?.user?.emeelanrole));
        navigation.navigate('Main');
      } else {
        const errorData = await res.json();
        Alert.alert('Login Failed', errorData?.message || 'Invalid Credentials.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong, please try again later.');
    }
  };

  const handleHelpClick = () => {
    navigation.navigate('Help');
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>EMEELAN</Text>
            <Text style={styles.logoSubtitle}>गठजोड़</Text>
          </View>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subWelcomeText}>Sign in to continue</Text>
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email or Mobile Number"
              placeholderTextColor="#999"
              onChangeText={setUserId}
              value={userid}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
  style={styles.input}
  placeholder="Password"
  placeholderTextColor="#999"
  secureTextEntry={!showPassword}
  onChangeText={setPassword}
  value={password}  // Default password
/>
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink} onPress={() => navigation.navigate('Register')}>
              Sign Up
            </Text>
          </Text>
          <TouchableOpacity style={styles.helpButton} onPress={handleHelpClick}>
            <Text style={styles.helpButtonText}>Need Help?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3498db',
  },
  logoSubtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subWelcomeText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#7f8c8d',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#7f8c8d',
  },
  signupLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  helpButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  helpButtonText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

