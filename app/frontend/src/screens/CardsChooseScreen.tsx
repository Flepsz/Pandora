import { Text, View, YStack } from "tamagui";
import CardList from "../components/Card/CardList";

export default function CardsChoose() {
  return (
    <YStack className="h-screen justify-center" space="$5">
      <Text className="text-white font-bold text-2xl mx-auto">Choose An Card</Text>
      <CardList />
    </YStack>
  )
}
