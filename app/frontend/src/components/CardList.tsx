import { SafeAreaView, ScrollView } from "react-native";
import { Text, XStack } from "tamagui";
import {
	useRetrieveCardsQuery,
	useRetrieveUserQuery,
} from "../redux/features/authApiSlice";
import { useSelector } from "react-redux";
import { selectAccount, selectName, setName } from "../redux/features/authSlice";
import { useEffect } from "react";
import Card from "./Card";
import { Card as CardProps } from "../redux/features/types";
import { ActivityIndicator } from "react-native";
import { useAppDispatch } from "../redux/hooks";

export default function CardList() {
	const { data: userData } = useRetrieveUserQuery();

	const dispatch = useAppDispatch();
  
	useEffect(() => {
    if (userData) {
      dispatch(setName(userData.first_name));
    }
  }, [dispatch, userData]);
	const name = useSelector(selectName);

	const account = useSelector(selectAccount);  

	const {
		data: cardsData,
		isLoading,
		isError,
		refetch,
	} = useRetrieveCardsQuery({
		account,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<SafeAreaView>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<XStack className="flex">
					{cardsData ? (
						<>
							{cardsData.map((card: CardProps) => (
								<Card
									color={getRandomColor()}
									flag={card.flag}
									exp_date={card.expiration_date}
									last_numbers={getLastFourDigits(card.number)}
									owner={name}
									key={card.number}
								/>
							))}
							{cardsData.length <= 0 && (
								<Text className="mx-auto my-10 text-2xl font-bold text-white">
									You don't have any extract
								</Text>
							)}
						</>
					) : (
						<ActivityIndicator color="#c1c1c1" />
					)}
				</XStack>
			</ScrollView>
		</SafeAreaView>
	);
}

function getLastFourDigits(cardNumber: string): string {
	if (cardNumber && cardNumber.length >= 4) {
		return cardNumber.slice(-4);
	} else {
		return "Invalid Card Number";
	}
}

function getRandomColor(): string {
	const colors = ["purple", "green"];
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}
