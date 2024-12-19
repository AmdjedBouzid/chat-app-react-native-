import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      img: "https://via.placeholder.com/50",
      first_name: "John",
      last_name: "Doe",
    },
    {
      id: "2",
      img: "https://via.placeholder.com/50",
      first_name: "Jane",
      last_name: "Smith",
    },
    {
      id: "3",
      img: "https://via.placeholder.com/50",
      first_name: "Alex",
      last_name: "Brown",
    },
  ]);

  const handleAccept = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
    alert("Request accepted!");
  };

  const handleReject = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
    alert("Request rejected!");
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={{ uri: item.img }} style={styles.profileImage} />
      <View style={styles.notificationText}>
        <Text style={styles.name}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.subText}>Sent you a friend request</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleAccept(item.id)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleReject(item.id)}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingTop: 20,
    alignItems: "center", // Center horizontally
    width: 320, // Set width to screen width
    height: height, // Set height to screen height
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    width: "90%", // Occupy 92% of the screen width
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationText: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  subText: {
    fontSize: 13,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginLeft: 5,
  },
  acceptButton: {
    backgroundColor: "#007BFF",
  },
  rejectButton: {
    backgroundColor: "#FF4D4F",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});

export default NotificationsPage;
