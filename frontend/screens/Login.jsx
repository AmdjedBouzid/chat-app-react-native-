// Import necessary modules
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import axios from "axios"; // Import Axios
import { statesContainer } from "../context/GlobalState";
import ToastUtils from "../utils/Toast";
import Toast from "react-native-toast-message";
import DOMAIN from "../utils/constants";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to control the loading spinner
  const { setUser } = statesContainer();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${DOMAIN}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("Token", token); // Use AsyncStorage for React Native
        setUser(user);

        // Navigate to the main app flow
        navigation.navigate("MainAppFlow");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid email or password.";
      ToastUtils.showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/chat.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Log In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" /> // Spinner while loading
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footer}>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.footerLink}> Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>

      {/* Toast Configuration */}
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f2f5",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#006AFF",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  footerLink: {
    color: "#006AFF",
    fontWeight: "bold",
  },
});

export default LoginPage;
