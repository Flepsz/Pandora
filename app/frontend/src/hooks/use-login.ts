import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hooks";
import {
	useLoginMutation,
	useRetrieveUserQuery,
} from "../redux/features/authApiSlice";
import {
	setAuth,
	setName,
	setRegisterNumber,
} from "../redux/features/authSlice";
import Toast from "react-native-toast-message";
import { RootStackParamList } from "../navigator/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function useLogin() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		register_number: "",
		password: "",
	});

	const { register_number, password } = formData;

	const onChange = (text: string, name: string) => {
		setFormData({ ...formData, [name]: text });
	};

	const onSubmit = async () => {
		login({ register_number, password })
			.unwrap()
			.then((data) => {
				dispatch(setAuth({ access: data.access, refresh: data.refresh }));
				dispatch(setRegisterNumber(register_number));

				navigation.navigate("Accounts");

				Toast.show({ type: "success", text1: "Logged in" });
				return { success: true };
			})
			.catch((error) => {
				let errorMessage;

				if (error instanceof Object) {
					if (error.data) {
						if (error.data.status) {
							errorMessage = error.data.status;
						}
					}
				}

				if (error.status === 429) {
					Toast.show({
						type: "error", 
						text1: "Too Many Requests",
						text2: "Please try again later.",
					});
				} else {
					Toast.show({
						type: "error",
						text1: "Failed to log in, check your credentials",
						text2: errorMessage || "Unknown error",
					});
				}
				return { success: false, error };
			});
	};

	return {
		register_number,
		password,
		isLoading,
		onChange,
		onSubmit,
	};
}
