import "@tamagui/core/reset.css";
import { TamaguiProvider, YStack } from "tamagui";
import config from "./tamagui.config";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigator/RootNavigator";

import { useFonts } from "expo-font";

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
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
		</TamaguiProvider>
	);
}
