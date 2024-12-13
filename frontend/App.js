import { GlobalState } from "./context/GlobalState"; // Wrap with global state provider
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
export default function App() {
  return (
    <NavigationContainer>
      <GlobalState>
        <Tabs />
      </GlobalState>
    </NavigationContainer>
  );
}
