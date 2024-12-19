import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chats from "../screens/Chats";
import ChatDetails from "../screens/chatDetailes";
import Profile from "../screens/Profile";
// import Users from "../screens/Users";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ChatsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Chats" component={Chats} options={{ title: "Chats" }} />
    <Stack.Screen
      name="ChatDetails"
      component={ChatDetails}
      options={{ title: "Chat Details" }}
    />
  </Stack.Navigator>
);
const MainAppFlow = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Chats"
      component={ChatsStack}
      options={{ title: "Chats" }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{ title: "Profile" }}
    />
  </Tab.Navigator>
);

export default MainAppFlow;
