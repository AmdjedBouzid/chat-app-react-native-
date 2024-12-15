// Import necessary modules
import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    first_name: "John",
    last_name: "Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    phone_number: "+1234567890",
    email: "johndoe@example.com",
    birth_date: "1990-01-01",
    password: "********",
  });

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => Alert.alert("Logged out successfully!") },
    ]);
  };

  const handleUpdateProfile = () => {
    Alert.alert("Update Profile", "Feature coming soon!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: profile.image }} style={styles.profileImage} />
        </View>
        <Text style={styles.changeText}>Change Picture</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={profile.first_name}
            onChangeText={(text) => setProfile({ ...profile, first_name: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={profile.last_name}
            onChangeText={(text) => setProfile({ ...profile, last_name: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profile.email}
            keyboardType="email-address"
            onChangeText={(text) => setProfile({ ...profile, email: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={profile.phone_number}
            keyboardType="phone-pad"
            onChangeText={(text) => setProfile({ ...profile, phone_number: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birth Date</Text>
          <TextInput
            style={styles.input}
            value={profile.birth_date}
            onChangeText={(text) => setProfile({ ...profile, birth_date: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={profile.bio}
            multiline
            onChangeText={(text) => setProfile({ ...profile, bio: text })}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#f0f2f5",
  },
  profileContainer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60, // Makes it circular
    overflow: "hidden",
    marginBottom: 10,
  },
  
  profileImage: {
    width: "100%",
    height: "100%",
  },
  changeText: {
    fontSize: 14,
    color: "#006AFF",
    marginBottom: 20,
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
    backgroundColor: "#fff",
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
