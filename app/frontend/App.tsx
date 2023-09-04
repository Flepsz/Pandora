import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigator/RootNavigator";


export default function App() {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	);
}
