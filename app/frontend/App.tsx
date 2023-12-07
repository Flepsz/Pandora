import "@tamagui/core/reset.css";
import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RootNavigator from "./src/navigator/RootNavigator";
import Setup from "./src/components/utils/Setup";
import CustomProvider from "./src/redux/provider";

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "#1C2023",
	},
};

export default function App() {
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
