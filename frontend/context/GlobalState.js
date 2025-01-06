import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import DOMAIN from "../utils/constants";
import {
  getToken,
  fetchUser,
  fetchAllUsers,
  fetchFriends,
  fetchChats,
  handleGettingRequests,
} from "../utils/functions";
const globalContext = createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";
export const statesContainer = () => useContext(globalContext);

export const GlobalState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const USERS = await fetchAllUsers();
        setUsers(USERS);
        const FRIENDS = await fetchFriends();
        setFriends(FRIENDS);
        const ME = await fetchUser();
        setUser(ME);
        const CHATS = await fetchChats();
        // console.log("chats_____", CHATS);
        setChats(CHATS);

        const req = await handleGettingRequests();
        console.log("req_________", req);
        setNotifications(req);
      } catch (error) {
        console.log("error_________", error);
      }
    };

    fetchData();
    // const getUser = async () => {
    //   try {
    //     const token = await getToken();

    //     const response = await axios.get(`${DOMAIN}/api/users/me`, {
    //       headers: {
    //         authorization: `Bearer ${token}`,
    //       },
    //     });
    //     // console.log(response);
    //     if (response.status === 200) {
    //       setUser(response.data.user);
    //     }
    //   } catch (error) {
    //     setUser(null);
    //     console.error("Failed to load user data:", error);
    //   }
    // };
    // const getAllUsers = async () => {
    //   try {
    //     const token = await getToken();
    //     const response = await axios.get(`${DOMAIN}/api/users/all`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     // console.log(response.data.users);
    //     if (response.status === 200) {
    //       setUsers(response.data.users);
    //     }
    //   } catch (error) {
    //     setUsers([]);
    //     console.error("Failed to load user data:", error);
    //   }
    // };
    // const getFriends = async () => {
    //   try {
    //     const token = await getToken();
    //     const response = await axios.get(`${DOMAIN}/api/users/friends`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     // console.log("friends_____", response.data.friends);
    //     if (response.status === 200) {
    //       setFriends(response.data.friends);
    //     }
    //   } catch (error) {
    //     setFriends([]);
    //     console.error("Failed to load user data:", error);
    //   }
    // };
    // getFriends();
    // getAllUsers();
    // getUser();
  }, []);

  return (
    <globalContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        friends,
        setFriends,
        chats,
        setChats,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
