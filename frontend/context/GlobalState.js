import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import DOMAIN from "../utils/constants";
const globalContext = createContext();

export const statesContainer = () => useContext(globalContext);

export const GlobalState = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get(`${DOMAIN}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        setUser(null);
        console.error("Failed to load user data:", error);
      }
    };

    getUser();
  }, []);

  return (
    <globalContext.Provider value={{ user, setUser }}>
      {children}
    </globalContext.Provider>
  );
};
