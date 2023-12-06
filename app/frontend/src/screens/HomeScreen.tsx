import { SafeAreaView, View } from "react-native";
import { Text, XStack, YStack, ScrollView, Button } from "tamagui";
import User from "../components/User";
import Card, { XStackCard } from "../components/Card";
import { ArrowLeftRight, Download } from "@tamagui/lucide-icons";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import RecentHistory from "../components/RecentHistory";
import CardList from "../components/CardList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRetrieveUserQuery } from "../redux/features/authApiSlice";
import { setName, selectName } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks";

export type HomeScreenNavigatioProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Home">,
	NativeStackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
	const { data: userData } = useRetrieveUserQuery();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userData) {
			dispatch(setName(userData.first_name));
		}
	}, [dispatch, userData]);
	const name = useSelector(selectName);

	return (
		<SafeAreaView className="">
			<ScrollView className="flex flex-col gap-5 p-3 pt-12">
				<YStack className="flex flex-col bg-primary">
					<XStack className="items-start justify-between">
						<User avatar={userData?.photo_logo} name={name} />
					</XStack>
				</YStack>
				<YStack>
					<XStack className="flex gap-3 mb-1">
						<Text className="text-lg font-bold text-white">Cards</Text>
					</XStack>
					<CardList />
				</YStack>
				<XStack className="flex flex-row justify-between flex-2">
					<Button className="flex bg-white rounded-sm w-44 h-9">
						<Text className="text-sm font-black text-purple-d">LOANS</Text>
						<Download color="#530082" size={20} />
					</Button>
					<Button className="rounded-sm flexbg-white w-44 h-9">
						<Text className="text-sm font-black text-purple-d">TRANSFER</Text>
						<ArrowLeftRight color="#530082" size={20} />
					</Button>
				</XStack>
				<View>
					<Text className="text-lg font-bold text-white">History</Text>

					<RecentHistory />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
