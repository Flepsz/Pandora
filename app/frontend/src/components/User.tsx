import { useNavigation } from "@react-navigation/native";
import { Avatar, Text, XStack, YStack } from "tamagui";
import { RootStackParamList } from "../navigator/RootNavigator";
import { HomeScreenNavigatioProp } from "../screens/Home";

interface UserBarI {
	avatar?: string;
	name: string;
}

export default function UserBar({ avatar, name }: UserBarI) {
	const navigation = useNavigation<HomeScreenNavigatioProp>();
	return (
		<XStack
			onPress={() =>
				navigation.navigate("UserProfile", {
					avatar: avatar,
				})
			}
			space="$2"
			ai="center"
		>
			<Avatar size="$4" circular>
				<Avatar.Image src={avatar} />

				<Avatar.Fallback backgroundColor="$gray5" />
			</Avatar>

			<YStack className="justify-center">
				<Text color="#A6A6A6">Welcome</Text>
				<Text className="-mt-1 text-lg font-medium text-white">{name}</Text>
			</YStack>
		</XStack>
	);
}
