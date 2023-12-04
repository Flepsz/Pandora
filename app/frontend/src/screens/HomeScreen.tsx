import { View } from "react-native";
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

export type HomeScreenNavigatioProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Home">,
	NativeStackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
	return (
		<View className="flex flex-col gap-5 p-3 pt-12">
			<YStack className="flex flex-col bg-primary">
				<XStack className="items-start justify-between">
					<User avatar="https://github.com/flepsz.png" name="Felipe" />
				</XStack>
			</YStack>
			<YStack>
				<XStack className="flex gap-3 mb-1">
					<Text className="text-lg font-bold text-white">Cards</Text>
				</XStack>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<XStack className="flex gap">
						<Card
							color="green"
							balance="777.777"
							owner="Góes Rodrigo"
							exp_date="09/47"
							last_numbers="2377"
							flag="Mastercard"
						/>
						<Card
							color="purple"
							balance="777.777"
							owner="Góes Rodrigo"
							exp_date="09/47"
							last_numbers="2377"
							flag="Mastercard"
						/>
						<Card
							color="purple"
							balance="777.777"
							owner="Góes Rodrigo"
							exp_date="09/47"
							last_numbers="2377"
							flag="Mastercard"
						/>
					</XStack>
				</ScrollView>
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
		</View>
	);
}
