import { Text, View, XStack, YStack } from "tamagui";
import { ArrowRightLeft, DollarSign } from "@tamagui/lucide-icons";
import formatCurrency from "../utils/formatCurrency";

interface HistoryCardPropsI {
	amount: number;
	action: string;
	source: string;
}

export default function HistoryCard({
	action,
	amount,
	source,
}: HistoryCardPropsI) {
	return (
		<XStack className="flex items-center">
			<View className="p-2 mt-4 rounded-xl bg-zinc-300">
				{source === "Transaction" && <ArrowRightLeft />}
				{source === "Installment" && <DollarSign />}
				{source === "Loan" && <DollarSign />}
			</View>
			<XStack className="flex items-center justify-between flex-1 mt-4 ml-2">
				<View>
					<Text className="text-white">{source}</Text>
					<Text className="text-zinc-300">{action}</Text>
				</View>
				<View className="">
					{action === "Received" && (
						<Text className="text-base text-green-600">
							{formatCurrency(amount)}
						</Text>
					)}
					{action === "Sent" && (
						<Text className="text-base text-red-600">
							- {formatCurrency(amount)}
						</Text>
					)}
				</View>
			</XStack>
		</XStack>
	);
}
