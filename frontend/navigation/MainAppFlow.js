import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from "../screens/Chats";
import ChatDetails from "../screens/chatDetailes";
import Profile from "../screens/Profile";
import NotificationsPage from "../screens/notificationScreen";
import UsersPage from "../screens/UsersScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { statesContainer } from "../context/GlobalState";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: "#D9EAFD" },
  headerTintColor: "darkblue",
  headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
  headerShown: true,
};

const tabOptions = {
  tabBarActiveTintColor: "blue",
  tabBarInactiveTintColor: "gray",
  tabBarStyle: { backgroundColor: "#D9EAFD" },
  tabBarHideOnKeyboard: true,
};

const ChatsStack = () => (
  <Stack.Navigator screenOptions={headerOptions}>
    <Stack.Screen name="Chats" component={Chats} options={{ title: "Chats" }} />
    <Stack.Screen
      name="ChatDetails"
      component={ChatDetails}
      options={{ title: "Chat Details" }}
    />
  </Stack.Navigator>
);

const UsersStack = () => (
  <Stack.Navigator screenOptions={headerOptions}>
    <Stack.Screen
      name="UsersScreen"
      component={UsersPage}
      options={{ title: "Users" }}
    />
    <Stack.Screen
      name="ChatDetails"
      component={ChatDetails}
      options={{ title: "Chat Details" }}
    />
  </Stack.Navigator>
);

const MainAppFlow = () => {
  const { notifications } = statesContainer();
  const n = notifications.length;

  return (
    <Tab.Navigator screenOptions={{ ...tabOptions, headerShown: false }}>
      <Tab.Screen
        name="Chat"
        component={ChatsStack}
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersStack}
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsPage}
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" color={color} size={size} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: "#D9EAFD" },
          headerTintColor: "darkblue",
          headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
          tabBarBadge: n > 0 ? n : undefined,
          tabBarBadgeStyle: { backgroundColor: "red", color: "#D9EAFD" },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: "#D9EAFD" },
          headerTintColor: "darkblue",
          headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainAppFlow;
