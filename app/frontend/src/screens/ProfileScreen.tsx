import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigator/RootNavigator";
import { ScrollView, Text, View, YStack } from "tamagui";
import ProfilePic from "../components/ProfilePic";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "UserProfile">;

export default function ProfileScreen() {
	const {
		params: { avatar },
	} = useRoute<ProfileScreenRouteProp>();

	return (
		<ScrollView className="w-full h-full pt-12">
			<YStack className="w-screen h-screen">
				<ProfilePic avatar={avatar} />
			</YStack>
		</ScrollView>
	);
}
