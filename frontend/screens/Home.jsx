import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import { statesContainer } from "../context/GlobalState"; // Import the correct hook

const Home = () => {
  const { user } = statesContainer(); // Use the correct hook here
  console.log("user__", user);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        {user ? `Welcome, ${user.name}!` : "No user logged in."}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "red",
    fontSize: 18,
  },
});

export default Home;
