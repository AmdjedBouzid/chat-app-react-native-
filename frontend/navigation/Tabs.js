import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ChatsScreen from "../screens/Chats";
import ChatDetailsScreen from "../screens/chatDetailes";
import ProfileScreen from "../screens/Profile";
import LoginPage from "../screens/Login";
import SignupPage from "../screens/SigneUp";
import { statesContainer } from "../context/GlobalState";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ChatsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Chats"
      component={ChatsScreen}
      options={{ title: "Chats" }}
    />
    <Stack.Screen
      name="ChatDetails"
      component={ChatDetailsScreen}
      options={{ title: "Chat Details" }}
    />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="Signup" component={SignupPage} />
  </Stack.Navigator>
);

const Tabs = () => {
  const { user, setUser } = statesContainer();

  // Ensure state updates happen safely, such as in an effect or a handler.
  // useEffect(() => {
  //   // Example: Resetting user state when Tabs loads (if needed)
  //   setUser(null);
  // }, []);

  return (
    <Tab.Navigator>
      {user ? (
        <>
          <Tab.Screen
            name="Chats"
            component={ChatsStack}
            options={{ title: "Chats" }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
        </>
      ) : (
        <Tab.Screen name="Auth" component={AuthStack} />
      )}
    </Tab.Navigator>
  );
};

export default Tabs;
