import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chats from "../screens/Chats";
import ChatDetails from "../screens/chatDetailes";
import Profile from "../screens/Profile";
// import Users from "../screens/Users";
import NotificationsPage from "../screens/notificationScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TestUploadScreen from "../screens/testScreen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ChatsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Chats" component={Chats} options={{ title: "Chats" }} />
    <Stack.Screen
      name="ChatDetails"
      component={ChatDetails}
      options={{ title: "Chat Details", headerShown: true }}
    />
  </Stack.Navigator>
);
const MainAppFlow = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Chat"
      component={ChatsStack}
      options={{
        title: "Notifications",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="notifications" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="notifications"
      component={NotificationsPage}
      options={{
        title: "Notifications",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="notifications" color={color} size={size} />
        ),
        tabBarLabel: "Requests",
        tabBarBadge: 5,
        tabBarBadgeStyle: { backgroundColor: "red", color: "#D9EAFD" },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#D9EAFD" },
        headerShown: true,
        headerStyle: { backgroundColor: "#D9EAFD" },
        headerTintColor: "darkblue",
        headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        tabBarHideOnKeyboard: true,
      }}
    />

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        title: "Profile",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="notifications" color={color} size={size} />
        ),
        tabBarLabel: "Profile",
        // tabBarBadge: 5,
        tabBarBadgeStyle: { backgroundColor: "red", color: "#D9EAFD" },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#D9EAFD" },
        headerShown: true,
        headerStyle: { backgroundColor: "#D9EAFD" },
        headerTintColor: "darkblue",
        headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        tabBarHideOnKeyboard: true,
      }}
    />
    {/* <Tab.Screen name="test" component={TestUploadScreen} /> */}
  </Tab.Navigator>
);

export default MainAppFlow;
