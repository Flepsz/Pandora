import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  )
}