import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import HomeScreen from "../screens/HomeScreen";
import { StyleSheet } from "react-native";

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
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarStyle: styles.tabBarStyle,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#2B2F32",
    borderBlockColor: "#2B2F32",
    borderRadius: 10,
    margin: 10,
    height: 50
  }
})