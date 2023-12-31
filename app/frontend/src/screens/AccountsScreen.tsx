import { useRetrieveAccountsQuery } from "../redux/features/authApiSlice";
import { useAppDispatch } from "../redux/hooks";
import { setAccount } from "../redux/features/authSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { ScrollView, Text, View, YStack } from "tamagui";
import { ActivityIndicator, RefreshControl, SafeAreaView, TouchableOpacity } from "react-native";
import TopBrand from "../components/common/TopBrand";
import { useCallback, useEffect, useState } from "react";
import { XStack } from "tamagui";

export interface AccountProp {
	number: string;
	agency: string | undefined;
	acc_type: string;
	balance: string;
	limit: string;
}

export default function AccountsScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const {
		data: accounts,
		isLoading,
		isFetching,
		refetch,
	} = useRetrieveAccountsQuery();

	const dispatch = useAppDispatch();

	const handleScroll = useCallback(
		(event: any) => {
			const offsetY = event.nativeEvent.contentOffset.y;
			const triggerOffset = 100;

			if (offsetY < -triggerOffset) {
				refetch();
			}
		},
		[refetch]
	);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		refetch().finally(() => setRefreshing(false));
	}, [refetch]);

	useEffect(() => {
		const unsubscribeFocus = navigation.addListener("focus", () => {
			refetch();
		});

		const unsubscribeScroll = navigation.addListener("scroll", handleScroll);

		return () => {
			unsubscribeFocus();
			unsubscribeScroll();
		};
	}, [navigation, refetch, handleScroll]);

	return (
		<SafeAreaView className="flex-1">
			<ScrollView
				className="flex-1"
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				<TopBrand />
				<View className="flex flex-col items-center justify-center" space="$4">
					<Text className="mx-auto text-xl text-white">
						Which account do you need to access?
					</Text>
					<View className="w-full h-full px-2">
						<XStack className="flex flex-wrap justify-center gap-2">
							{accounts ? (
								accounts.map((account: AccountProp) => (
									<TouchableOpacity
										key={account.number}
										onPress={() => {
											dispatch(setAccount(account.number));
											navigation.navigate("Main");
										}}
										className="flex flex-col items-center justify-center w-[47%] h-32 rounded-lg bg-zinc-700"
									>
										<Text className="text-lg font-semibold text-white">
											Agency: {account.agency}
										</Text>
										<Text className="text-lg font-semibold text-white">
											Number: {account.number}
										</Text>
										<Text className="text-lg font-semibold text-white">
											Type: {account.acc_type}
										</Text>
									</TouchableOpacity>
								))
							) : (
								<ActivityIndicator color="#c1c1c1" />
							)}
						</XStack>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
