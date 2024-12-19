import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { statesContainer } from "../context/GlobalState";
import ToastUtils from "../utils/Toast";
import Toast from "react-native-toast-message";
import axios from "axios";
import DOMAIN from "../utils/constants";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = statesContainer();
  const [firstName, setFirstName] = useState(user.first_name || "first name");
  const [lastName, setLastName] = useState(user.last_name || "last name");
  const [email, setEmail] = useState(user.email || "example@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState(
    user.phone_number || "07 --------"
  );
  const [profileImage, setProfileImage] = useState(null);
  const [birthDate, setBirthDate] = useState(user.birth_date || "--/--/--");
  const [bio, setBio] = useState(user.bio || "my bio");

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("Token");
    setUser(null);
    setLoading(false);
  };
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("phone_number", phoneNumber);
      formData.append("birth_date", birthDate);
      formData.append("bio", bio);
      // Append the profile image if it exists
      if (profileImage) {
        formData.append("profile_image", {
          uri: profileImage,
          name: "profile.jpg",
          type: "image/jpeg",
        });
      }

      const response = await axios.put(`${DOMAIN}/api/users/me`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setUser(response.data.user);
        ToastUtils.showSuccessToast("Profile updated successfully!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating the profile.";
      ToastUtils.showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGettingUserData = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        ToastUtils.showErrorToast(errorMessage);
      }
    };

    handleGettingUserData();
  }, []);

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } else {
      ToastUtils.showErrorToast(
        "Permission to access camera roll is required!"
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handlePickImage}>
          <View style={styles.imageWrapper}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require("../assets/people.png")}
                style={styles.profileImage}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePickImage}>
          <Feather name="edit-3" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View> */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birth Date</Text>
          <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={(text) => setBirthDate(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            multiline
            value={bio}
            onChangeText={(text) => setBio(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Update Profile</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log Out</Text>
          )}
        </TouchableOpacity>
      </View>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "white",
  },
  profileContainer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "90%",
    height: "90%",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f6f6f6",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#006AFF",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfilePage;
