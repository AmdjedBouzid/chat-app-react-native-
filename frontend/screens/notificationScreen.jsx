import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getToken } from "../utils/functions";
import axios from "axios";
import DOMAIN from "../utils/constants";
import ToastUtils from "../utils/Toast";
const { width, height } = Dimensions.get("window");
import { statesContainer } from "../context/GlobalState";
const NotificationsPage = () => {
  const isFocused = useIsFocused();

  const {
    users,
    friends,
    user,
    setFriends,
    setUsers,
    setNotifications,
    notifications,
  } = statesContainer();
  useEffect(() => {
    const handleGettingRequests = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${DOMAIN}/api/notifications`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          // console.log("data___", response.data.requests);
          setNotifications(response.data.requests);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    };
    handleGettingRequests();
  }, [isFocused]);

  const handleAccept = async (id) => {
    try {
      const token = await getToken();
      const response = await axios.post(
        `${DOMAIN}/api/notifications/accept/${id}`,
        null,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);

      // console.log("hoiiiiiiiiiiii");
      // console.log("notifications______", notifications);
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );

      const currentNotification = notifications.filter((n) => n.id === id);
      const currentUserSenderId = currentNotification[0].idSender;
      const currentUserSender = users.filter(
        (user) => user.id === currentUserSenderId
      )[0];
      console.log("currentUserSender:", currentUserSender);
      if (currentUserSender) {
        // console.log("friends:", friends);
        setFriends((prev) => {
          const updatedFriends = [...prev, currentUserSender];
          // console.log("Updated friends:", updatedFriends);
          return updatedFriends;
        });
      }

      ToastUtils.showSuccessToast(response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      ToastUtils.showErrorToast(errorMessage);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = await getToken();
      console.log("token______", token);
      const response = await axios.post(
        `${DOMAIN}/api/notifications/reject/${id}`, // Correct endpoint
        null,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setNotifications(
          notifications.filter((notification) => notification.id !== id)
        );
        ToastUtils.showSuccessToast(response.data.message);
      }
    } catch (error) {
      console.error("Error rejecting request:", error);

      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      ToastUtils.showErrorToast(errorMessage);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={{ uri: item.image }} style={styles.profileImage} />
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
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: "#28a745",
  },
  rejectButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default NotificationsPage;
