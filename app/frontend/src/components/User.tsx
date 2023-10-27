import { Avatar, Text, XStack, YStack } from "tamagui";

export default function User() {
  return (
    <XStack space="$2">
      <Avatar size="$4.5" circular>
        <Avatar.Image 
          src="https://github.com/flepsz.png" 
        />

        <Avatar.Fallback backgroundColor="$gray5" />
      </Avatar>

      <YStack className="justify-center">
        <Text color="#A6A6A6">
          Welcome
        </Text>
        <Text className="-mt-1 text-lg font-medium text-white">
          Felipe
        </Text>
      </YStack>
    </XStack>
  )
}
