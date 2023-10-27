import { View } from "react-native";
import InputM from "../components/InputM";
import { useState } from "react";
import { YStack } from "tamagui";
import User from "../components/User";

export default function HomeScreen() {
  const [test, setTest] = useState<string>("")
  return (
    <View className="pt-10">
      <YStack bg="#1C2023" p="$3">
        <User />
      </YStack>
    </View>
  )
}

