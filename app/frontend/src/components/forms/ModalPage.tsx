import { FormEvent } from "react";
import { Button, Form, Text, View, XStack } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigator/RootNavigator";
import { ActivityIndicator, Image } from "react-native";

interface FormsI {
	isRegister?: boolean;
	isCustomerNP?: boolean;
	children: React.ReactNode;
	isLoading: boolean;
	btnText: string;
	onSubmit: () => void;
}

export default function ModalPage({
	isRegister,
	isCustomerNP,
	children,
	isLoading,
	btnText,
	onSubmit,
}: FormsI) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
	return (
		<View className="">
      <View className="flex items-center justify-center h-32 pt-4 mb-4 rounded-b-3xl bg-purple-d">
        <Image source={require("../../../assets/logo-white.png")} className="h-14 w-14"  />
      </View>
			<View className="flex flex-col justify-center w-full">
      <Form
				onSubmit={onSubmit}
				className="flex flex-col justify-center"
			>
				<Text className="mx-auto mb-4 text-xl font-bold text-white">
					{isRegister
						? "Please register for an account"
						: "Please login to your account"}
				</Text>
				<View className="flex flex-col w-[90%] mx-auto" space="$3">
					{children}
				</View>
				<View className="flex flex-col flex-wrap w-56 mx-auto mt-5 text-center mb-7">
					<Button
						onPress={onSubmit}
						disabled={isLoading}
						className="flexCenter text-white bg-[#530082] w-56 rounded-lg"
					>
						{isLoading ? (
							<ActivityIndicator color="#c1c1c1" />
						) : (
							<Text className="text-xl font-bold text-center text-white">{btnText}</Text>
						)}
					</Button>
				</View>
			</Form>
			<XStack className="flex items-center justify-between">
				<Text className="mb-0 mr-2 text-xl font-bold text-white">
					{isRegister ? "Already have an account?" : "Don't have an account?"}
				</Text>
					<Button
						onPress={() => {
              isRegister
                ? isCustomerNP
                  ? navigation.navigate("LoginCNP")
                  : navigation.navigate("LoginCLP")
                : isCustomerNP
                ? navigation.navigate("RegisterCNP")
                : navigation.navigate("RegisterCLP")
            }}
						className=""
						data-te-ripple-init
						data-te-ripple-color="light"
					>
						{isRegister ? "Log In" : "Register"}
					</Button>
			</XStack>
      </View>
		</View>
	);
}
