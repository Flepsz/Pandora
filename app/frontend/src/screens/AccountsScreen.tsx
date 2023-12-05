import { useRetrieveAccountsQuery } from "../redux/features/authApiSlice";
import { useAppDispatch } from "../redux/hooks";
import { setAccount } from "../redux/features/authSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { Text, View } from "tamagui";
import { TouchableOpacity } from "react-native";
import TopBrand from "../components/common/TopBrand";


export interface AccountProp {
	number: string;
	agency: string | undefined;
	acc_type: string;
	balance: string;
	limit: string;
}

export default function AccountsScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const { data: accounts, isLoading, isFetching } = useRetrieveAccountsQuery();

	const dispatch = useAppDispatch();

	return (
		<>
		<TopBrand />
		<View className="flex flex-col items-center justify-center" space="$4">
			<Text className="mx-auto text-xl text-white">
				Which account you need to access?
			</Text>
			{accounts?.map((account: AccountProp) => (
				<TouchableOpacity key={account.number}
					onPress={() => {
						dispatch(setAccount(account.number));
						navigation.navigate("Main");
					}}
					className="flex flex-col items-center justify-center w-1/2 h-32 rounded-lg bg-zinc-700"
				>
					<Text className="text-lg font-semibold text-white">Agency: {account.agency}</Text>
					<Text className="text-lg font-semibold text-white">Number: {account.number}</Text>
					<Text className="text-lg font-semibold text-white">Type: {account.acc_type}</Text>
				</TouchableOpacity>
			))}
		</View>
		</>
	);
}
