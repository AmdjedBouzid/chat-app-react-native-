import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticationFlow from "./AuthenticationFlow";
import MainAppFlow from "./MainAppFlow";
import { statesContainer } from "../context/GlobalState";

const RootNavigator = () => {
  const { user } = statesContainer();

  return (
    <NavigationContainer style={{ pointerEvents: "none" }}>
      {user ? <MainAppFlow /> : <AuthenticationFlow />}
    </NavigationContainer>
  );
};

export default RootNavigator;
