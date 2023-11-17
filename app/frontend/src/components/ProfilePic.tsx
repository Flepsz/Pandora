import { Avatar, Text, View, XStack, YStack } from "tamagui";

interface ProfilePicPropsI {
	avatar?: string;
}

export default function ProfilePic({ avatar }: ProfilePicPropsI) {
	return (
		<View className="w-full bg-white h-[40%] flex justify-center items-center text-center">
			<YStack className="">
				<Avatar size="$13" circular>
					<Avatar.Image src={avatar} className="" />
					<Avatar.Fallback backgroundColor="$gray5" />
				</Avatar>
			</YStack>
		</View>
	);
}
