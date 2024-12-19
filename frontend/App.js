import { GlobalState } from "./context/GlobalState"; // Wrap with global state provider
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import RootNavigator from "./navigation/RootNavigator";
export default function App() {
  return (
    <GlobalState>
      <RootNavigator />
    </GlobalState>
  );
}
