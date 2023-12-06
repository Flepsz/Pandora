import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hooks";
import {
	useLoginMutation,
	useRetrieveUserQuery,
} from "../redux/features/authApiSlice";
import { setAuth, setName, setRegisterNumber } from "../redux/features/authSlice";
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
				Toast.show({ type: "error", text1: "Failed to log in" });

				console.log(error);
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
