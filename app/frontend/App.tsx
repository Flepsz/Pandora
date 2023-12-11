import "@tamagui/core/reset.css";
import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config";
import { useFonts } from 'expo-font'

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RootNavigator from "./src/navigator/RootNavigator";
import Setup from "./src/components/utils/Setup";
import CustomProvider from "./src/redux/provider";
import { useEffect } from "react";

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "#1C2023",
	},
};

export default function App() {
	const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

	return (
		<TamaguiProvider config={config}>
			<CustomProvider>
				<NavigationContainer theme={MyTheme}>
					<RootNavigator />
				</NavigationContainer>
			</CustomProvider>
			<Setup />
		</TamaguiProvider>
	);
}
