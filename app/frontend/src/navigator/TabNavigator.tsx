import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import * as IonIcon from "react-native-vector-icons/Ionicons";
import * as MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as FTIcon from "react-native-vector-icons/FontAwesome";
import Home from "../screens/Home";
import { StyleSheet } from "react-native";
import { ROUTES } from "../constants";

export type TabStackParamList = {
	Home: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

export default function TabNavigator() {
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarStyle: styles.tabBarStyle,
				tabBarShowLabel: false,
				tabBarActiveTintColor: "#661395",
				tabBarIcon: ({ color, size, focused }) => {
					let iconName;

					if (route.name === ROUTES.HOME) {
						iconName = focused ? "home" : "home-outline";
						return <IonIcon.default name={iconName} size={25} color={color} />;
					} else if (route.name === ROUTES.INVESTMENTS) {
						iconName = "bank-plus";
						return <MatIcon.default name={iconName} size={24} color={color} />;
					} else if (route.name === ROUTES.LOANS) {
						iconName = focused ? "hand-coin" : "hand-coin-outline";
						return <MatIcon.default name={iconName} size={26} color={color} />;
					} else if (route.name === ROUTES.TRANSFERS) {
						iconName = "bank-transfer";
						return <MatIcon.default name={iconName} size={35} color={color} />;
					} else if (route.name === ROUTES.SETTINGS) {
						iconName = focused ? "settings" : "settings-outline";
						return <IonIcon.default name={iconName} size={25} color={color} />;
					}
				},
			})}
		>
			<Tab.Screen
				name={ROUTES.HOME}
				component={Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name={ROUTES.INVESTMENTS}
				component={Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name={ROUTES.LOANS}
				component={Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name={ROUTES.TRANSFERS}
				component={Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name={ROUTES.SETTINGS}
				component={Home}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	tabBarStyle: {
		backgroundColor: "#2B2F32",
		borderBlockColor: "#2B2F32",
		borderRadius: 10,
		margin: 10,
		height: 50,
	},
});
