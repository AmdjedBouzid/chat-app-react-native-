import React, { createContext, useContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const globalContext = createContext();

export const statesContainer = () => useContext(globalContext);

export const GlobalState = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        // const token = await AsyncStorage.getItem("token");
        setUser({ name: "amdjed" });
      } catch (error) {
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
