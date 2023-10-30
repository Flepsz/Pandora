import { View } from "react-native";
import { useState } from "react";
import { XStack, YStack } from "tamagui";
import User from "../components/User";

export default function HomeScreen() {
  const [test, setTest] = useState<string>("")
  return (
    <View className="pt-10">
      <YStack bg="#1C2023" p="$3">
        <XStack justifyContent="space-between" alignItems="center">
          <User avatar="https://github.com/flepsz.png" name="Felipe"/>
        </XStack>
      </YStack>
    </View>
  )
}

