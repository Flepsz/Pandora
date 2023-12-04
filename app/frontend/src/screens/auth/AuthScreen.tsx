import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View, YStack } from "tamagui";
import { RootStackParamList } from "../../navigator/RootNavigator";


export default function AuthScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex flex-col gap-5 justify-center items-center">
      <Text>Who you are?</Text>
      <YStack>
        <Button onPress={() => {navigation.navigate("RegisterCNP")}}>Natural Person</Button>
        <Button onPress={() => {navigation.navigate("LoginCLP")}}>Legal Person</Button>
      </YStack>
    </View>
  );
}
