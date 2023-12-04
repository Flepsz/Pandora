import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View, YStack } from "tamagui";
import { RootStackParamList } from "../../navigator/RootNavigator";


export default function AuthScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex flex-col items-center justify-center h-screen gap-5">
      <Text className="text-xl font-bold text-white">Who you are?</Text>
      <YStack className="flex flex-col" space="$3">
        <Button onPress={() => {navigation.navigate("RegisterCNP")}}>Natural Person</Button>
        <Button onPress={() => {navigation.navigate("LoginCLP")}}>Legal Person</Button>
      </YStack>
    </View>
  );
}
