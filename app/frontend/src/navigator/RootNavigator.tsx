import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
	return (
		<RootStack.Navigator>
			<RootStack.Group>
				<RootStack.Screen name="Main" component={HomeScreen} />
			</RootStack.Group>
		</RootStack.Navigator>
	);
}
