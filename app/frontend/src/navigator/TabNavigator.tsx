import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import * as IonIcon from "react-native-vector-icons/Ionicons";
import * as MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as FTIcon from "react-native-vector-icons/FontAwesome";
import Home from "../screens/HomeScreen";
import { StyleSheet } from "react-native";
import { ROUTES } from "../constants";

export type TabStackParamList = {
	Home: undefined;
	Transfers: undefined;
	Loans: undefined;
	Investments: undefined;
	Settings: undefined;
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

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
						return <IonIcon.default name={iconName} size={25} color={color} />;
					} else if (route.name === "Investments") {
						iconName = "bank-plus";
						return <MatIcon.default name={iconName} size={24} color={color} />;
					} else if (route.name === "Loans") {
						iconName = focused ? "hand-coin" : "hand-coin-outline";
						return <MatIcon.default name={iconName} size={26} color={color} />;
					} else if (route.name === "Transfers") {
						iconName = "bank-transfer";
						return <MatIcon.default name={iconName} size={35} color={color} />;
					} else if (route.name === "Settings") {
						iconName = focused ? "settings" : "settings-outline";
						return <IonIcon.default name={iconName} size={25} color={color} />;
					}
				},
			})}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Investments"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Loans"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Transfers"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Settings"
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
