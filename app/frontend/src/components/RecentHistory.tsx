import { ScrollView, Text, XStack, YStack } from "tamagui";
import HistoryCard from "./HistoryCard";

export default function RecentHistory() {
	return (
		<YStack className="p-4 rounded-lg h-80 bg-secondary">
			<XStack className="flex justify-between">
				<Text className="font-bold text-white">Extract</Text>
				<Text className="text-white opacity-30">See all</Text>
			</XStack>
			<ScrollView>
				<YStack>
					<HistoryCard source="Transaction" action="Sent" amount={696} />
					<HistoryCard source="Loan" action="Sent" amount={4000} />
					<HistoryCard source="Transaction" action="Received" amount={777} />
					<HistoryCard source="Installment" action="Received" amount={4000} />
					<HistoryCard source="Loan" action="Sent" amount={77777} />
					<HistoryCard source="Loan" action="Sent" amount={77777} />
				</YStack>
			</ScrollView>
		</YStack>
	);
}
