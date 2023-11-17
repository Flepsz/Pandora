import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import "../../globals.css";
import React from "react";
import ProfileScreen from "../screens/ProfileScreen";

export type RootStackParamList = {
	UserProfile: { avatar?: string };
	Main: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
	return (
		<RootStack.Navigator>
			<RootStack.Group>
				<RootStack.Screen name="Main" component={TabNavigator} />
			</RootStack.Group>
			<RootStack.Group>
				<RootStack.Screen
					name="UserProfile"
					options={{ headerShown: false }}
					component={ProfileScreen}
				/>
			</RootStack.Group>
		</RootStack.Navigator>
	);
}
