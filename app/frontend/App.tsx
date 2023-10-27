import "@tamagui/core/reset.css";
import { TamaguiProvider, YStack } from "tamagui";
import config from "./tamagui.config";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RootNavigator from "./src/navigator/RootNavigator";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1C2023',
  },
};

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer theme={MyTheme}>
        <RootNavigator />
      </NavigationContainer>
    </TamaguiProvider>
  );
}
