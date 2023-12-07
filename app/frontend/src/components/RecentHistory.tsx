import { ScrollView, Text, XStack, YStack } from "tamagui";
import HistoryCard from "./HistoryCard";
import { useCallback, useEffect, useState } from "react";
import { useRetrieveManagerQuery } from "../redux/features/authApiSlice";
import { useSelector } from "react-redux";
import { selectAccount } from "../redux/features/authSlice";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Manager } from "../redux/features/types";

export default function RecentHistory() {
	const account = useSelector(selectAccount);

	const {
		data: managerData,
		isLoading,
		isError,
		refetch,
	} = useRetrieveManagerQuery({
		account,
	});

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		refetch().finally(() => setRefreshing(false));
	}, [refetch]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<YStack className="p-4 rounded-lg h-80 bg-secondary">
			{managerData ? (
				<>
					<XStack className="flex justify-between">
						<Text className="font-bold text-white">Extract</Text>
					</XStack>
					<ScrollView
						className="flex-1"
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
					>
						<YStack>
							{managerData.map((manager: Manager) => (
								<HistoryCard
									source={manager.source}
									action={manager.transaction_action}
									amount={manager.amount}
									key={manager.id}
								/>
							))}
							{managerData.length <= 0 && <Text className="mx-auto my-10 text-2xl font-bold text-white">You don't have any extract</Text>}
						</YStack>
					</ScrollView>
				</>
			) : (
				<ActivityIndicator color="#c1c1c1" />
			)}
		</YStack>
	);
}
