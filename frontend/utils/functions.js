import AsyncStorage from "@react-native-async-storage/async-storage";
import DOMAIN from "./constants";
import axios from "axios";
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("Token"); // Replace 'Token' with your key
    if (token !== null) {
      console.log("Token:", token);
      return token;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const fetchUser = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${DOMAIN}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    setUser(null);
    console.error("Failed to load user data:", error);
  }
};

export const fetchAllUsers = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${DOMAIN}/api/users/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.users;
    }
  } catch (error) {
    console.error("Failed to load users data:", error);
    return [];
  }
};

export const fetchFriends = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${DOMAIN}/api/users/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.friends;
    }
  } catch (error) {
    console.error("Failed to load friends data:", error);
    return [];
  }
};

export const fetchChats = async () => {
  try {
    const token = await getToken(); // Ensure getToken handles token retrieval correctly
    const response = await axios.get(`${DOMAIN}/api/chats`, {
      headers: {
        Authorization: `Bearer ${token}`, // Capitalize Authorization for consistency
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

export const handleGettingRequests = async () => {
  try {
    const token = await getToken();
    console.log("response_____", response);
    const response = await axios.get(`${DOMAIN}/api/notifications`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log("response_____", response);
    if (response.status === 200) {
      return response.data.requests;
    }
  } catch (error) {
    console.error(error.response.data);
  }
};
export default {
  getToken,
  fetchUser,
  fetchAllUsers,
  fetchFriends,
  fetchChats,
  handleGettingRequests,
};
