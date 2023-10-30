import { Avatar, Text, XStack, YStack } from "tamagui";

interface UserBarI {
  avatar?: string;
  name: string;
}

export default function UserBar({avatar, name}: UserBarI) {
  return (
    <XStack space="$2" ai="center">
      <Avatar size="$4.5" circular>
        <Avatar.Image 
          src={avatar} 
        />

        <Avatar.Fallback backgroundColor="$gray5" />
      </Avatar>

      <YStack className="justify-center">
        <Text color="#A6A6A6">
          Welcome
        </Text>
        <Text className="-mt-1 text-lg font-medium text-white">
          {name}
        </Text>
      </YStack>
    </XStack>
  )
}
