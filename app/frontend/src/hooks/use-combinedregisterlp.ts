import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	useRegisterMutation,
	useRegisterCNPMutation,
	useLoginMutation,
	useRegisterCLPMutation,
} from "../redux/features/authApiSlice";
import { Toast } from 'toastify-react-native'
import { useAppDispatch } from "../redux/hooks";
import { logout, setAuth, setRegisterNumber } from "../redux/features/authSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

export default function useCombinedRegisterCLP() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const dispatch = useAppDispatch();

	const [register, { isLoading: authLoading }] = useRegisterMutation();
	const [registerCLP, { isLoading }] = useRegisterCLPMutation();
	const [login, { isLoading: loginLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		last_name: "a",
		register_number: "",
		password: "",
		fantasy_name: "",
		cnpj: "",
		sr: "",
		mr: "",
		establishment_date: "",
	});

	const {
		last_name,
		register_number,
		password,
		fantasy_name,
		cnpj,
		sr,
		mr,
		establishment_date,
	} = formData;

	const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

	const onSubmit = () => {
		register({ first_name: fantasy_name, last_name, register_number, password })
			.unwrap()
			.then(() => {
				Toast.success("User created with success");

				login({ register_number, password })
          .unwrap()
          .then((data) => {
            dispatch(setAuth({ access: data.access, refresh: data.refresh }));
            dispatch(setRegisterNumber(register_number));
            Toast.success("Logged in");						
					
            registerCLP({
							customer: register_number,
							fantasy_name,
							cnpj: register_number,
							sr,
							mr,
							establishment_date,
						})
							.unwrap()
							.then(() => {
								Toast.success("Register your Customer LP with Success");
								dispatch(logout())
								navigation.navigate("LoginCLP");
							})
							.catch(() => {
								Toast.error("Failed to register Customer LP", "top");
							});
          })
          .catch(() => {
            Toast.error("Failed to log in", "top");
          });
			})
			.catch(() => {
				Toast.error("Failed to register user", "top");
			});
	};

	return {
		register_number,
		password,
		fantasy_name,
		cnpj,
		sr,
    mr,
    establishment_date,
		isLoading,
		onChange,
		onSubmit,
		authLoading,
	};
}
