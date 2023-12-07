import { Button, Text, View, YStack } from "tamagui";
import CardTransaction from "../components/Card/CardTransaction";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

export default function TransactionScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View className="flex flex-col items-center justify-center h-screen gap-5">
      <Text className="text-xl font-bold text-white">
        Choose a method of transaction
      </Text>
      <YStack className="flex flex-col" space="$3">
        <Button
          onPress={() => {
            navigation.navigate("Pix");
          }}
        >
          Pix
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("CardsChoose");
          }}
        >
          By Card
        </Button>
      </YStack>
    </View>
  );
}
