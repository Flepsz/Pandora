import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigator/RootNavigator";
import { ScrollView, Text, View, YStack } from "tamagui";
import ProfilePic from "../components/ProfilePic";
import { useRetrieveAddressesQuery } from "../redux/features/authApiSlice";
import { Address } from "../redux/features/types";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "UserProfile">;

export default function ProfileScreen() {
	const {
		params: { avatar },
	} = useRoute<ProfileScreenRouteProp>();

	const {
		data: Addresses,
		isLoading,
		isFetching,
		refetch,
	} = useRetrieveAddressesQuery();

	return (
		<ScrollView className="w-full h-full pt-12">
			<YStack className="w-screen h-screen">
				<ProfilePic avatar={avatar} />

				{Addresses ? (
					Addresses.map((address: Address) => {
						<>
						<Text>{address.street}</Text>
						<Text>{address.neighborhood}</Text>
						<Text>{address.city}</Text>
						<Text>{address.state}</Text>
						<Text>{address.zip_code}</Text>
						</>
					})
				) : (
					<>
					
					</>
				)}
			</YStack>
		</ScrollView>
	);
}
