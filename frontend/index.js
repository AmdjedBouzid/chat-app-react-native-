import { registerRootComponent } from "expo";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// import { GlobalState } from "./context/GlobalState"; // Wrap with global state provider
// import { NavigationContainer } from "@react-navigation/native";
// import Tabs from "./navigation/Tabs";
// export default function App() {
//   return (
//     <NavigationContainer>
//       <GlobalState>
//         <Tabs />
//       </GlobalState>
//     </NavigationContainer>
//   );
// }
