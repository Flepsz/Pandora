import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	useRegisterMutation,
	useRegisterCNPMutation,
	useLoginMutation,
} from "../redux/features/authApiSlice";
import Toast from "react-native-toast-message";
import {
	logout,
	setAuth,
	setName,
	setRegisterNumber,
} from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

export default function useCombinedRegisterCNP() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const dispatch = useAppDispatch();

	const [register, { isLoading: authLoading }] = useRegisterMutation();
	const [registerCNP, { isLoading }] = useRegisterCNPMutation();
	const [login, { isLoading: loginLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		register_number: "",
		password: "",
		name: "",
		social_name: "",
		rg: "",
		birthdate: "",
	});

	const { register_number, password, name, social_name, rg, birthdate } =
		formData;

	const onChange = (text: string, name: string) => {
		setFormData({ ...formData, [name]: text });
	};

	const onSubmit = () => {
		console.log("Dados enviados para login:", {
			register_number,
			birthdate,
			password,
		});
		register({
			first_name: name,
			last_name: social_name,
			register_number,
			password,
		})
			.unwrap()
			.then(() => {
				Toast.show({ type: "success", text1: "User created with success" });

				login({ register_number, password })
					.unwrap()
					.then((data) => {
						dispatch(setAuth({ access: data.access, refresh: data.refresh }));
						dispatch(setRegisterNumber(register_number));
						Toast.show({ type: "success", text1: "Logged in" });

						registerCNP({
							customer: register_number,
							name,
							social_name,
							cpf: register_number,
							rg,
							birthdate,
						})
							.unwrap()
							.then(() => {
								Toast.show({
									type: "success",
									text1: "Register your Customer NP with Success",
								});
								dispatch(logout());

								navigation.navigate("LoginCNP");
							})

							.catch((cnpError) => {
								const errorMessage = cnpError.data.status;
								Toast.show({
									type: "error",
									text1: "Failed to register Customer NP",
									text2: errorMessage,
								});
							});
					})
					.catch((error) => {
						const errorMessage = error.data.status;
						Toast.show({
							type: "error",
							text1: "Failed to log in",
							text2: errorMessage,
						});
					});
			})
			.catch((error) => {
				const errorMessage = error.data.status;
				Toast.show({
					type: "error",
					text1: "Failed to register user",
					text2: errorMessage,
				});
			});
	};

	return {
		register_number,
		password,
		name,
		social_name,
		rg,
		birthdate,
		isLoading,
		onChange,
		onSubmit,
		authLoading,
	};
}
