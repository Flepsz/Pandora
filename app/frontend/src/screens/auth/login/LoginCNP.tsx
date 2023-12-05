import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Form from "../../../components/forms/Form";
import { useLogin } from "../../../hooks";
import { RootStackParamList } from "../../../navigator/RootNavigator";

export default function LoginCNP() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { register_number, password, isLoading, onChange, onSubmit } =
		useLogin();

	const config = [
		{
			labelText: "CPF",
			labelId: "register_number",
			type: "text",
			value: register_number,
			required: true,
		},
		{
			labelText: "Password",
			labelId: "password",
			type: "text",
			secureTextEntry: true,
			value: password,
			required: true,
		},
	];

	return (
		<Form
			config={config}
			btnText="Log In"
			isLoading={isLoading}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}
