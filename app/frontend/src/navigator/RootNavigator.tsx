import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import "../../globals.css"
import { useState } from "react";

const RootStack = createNativeStackNavigator();
const {login, setLogin} = useState<boolean>();

export default function RootNavigator() {
	return (
		<RootStack.Navigator>
			<RootStack.Group>
				{login && }
				<RootStack.Screen name="Main" component={TabNavigator} />
				<RootStack.Screen name="Main" component={TabNavigator} />
			</RootStack.Group>
		</RootStack.Navigator>
	);
}
