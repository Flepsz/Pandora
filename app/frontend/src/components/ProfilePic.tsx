import { Avatar, Button, Text, View, XStack, YStack } from "tamagui";

interface ProfilePicPropsI {
	avatar?: string;
}

export default function ProfilePic({ avatar }: ProfilePicPropsI) {
	return (
		<View className="w-full h-[40%] flex justify-center items-center text-center">
			<YStack className="flex flex-col gap-4">
				<Avatar size="$13" circular>
					<Avatar.Image src={avatar} className="" />
					<Avatar.Fallback backgroundColor="$gray5" />
				</Avatar>
				<Button className="rounded-full bg-purple-l">
					<Text className="text-base font-bold text-center text-white">
						Change Photo
					</Text>
				</Button>
			</YStack>
		</View>
	);
}
