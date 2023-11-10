import { View } from "react-native";
import { useState } from "react";
import { Text, XStack, YStack } from "tamagui";
import User from "../components/User";
import Card, { XStackCard } from "../components/Card";

export default function HomeScreen() {
  const [test, setTest] = useState<string>("")
  return (
    <View className="flex flex-col gap-5 p-3 pt-12">
      <YStack className="flex flex-col bg-primary">
        <XStack className="items-start justify-between">
          <User avatar="https://github.com/flepsz.png" name="Felipe"/>
        </XStack>
      </YStack>
      <YStack >
        <XStack className="flex gap-3 mb-1">
          <Text className="text-xl font-bold text-white">Cards</Text>
          <Text className="text-xl font-bold text-white opacity-30">Accounts</Text>
        </XStack>
        <Card color="green" balance="777.777" owner="Góes Rodrigo" exp_date="09/47" last_numbers="2377" flag="Mastercard" />
      </YStack>
      
    </View>
  )
}

