import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ChatsScreen from "../screens/Chats";
import ChatDetailsScreen from "../screens/chatDetailes";
import ProfileScreen from "../screens/Profile";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ChatsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Chats" component={ChatsScreen} />
    <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} />
  </Stack.Navigator>
);

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chats" component={ChatsStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default Tabs;
