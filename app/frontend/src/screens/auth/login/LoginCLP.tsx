import Form, { Config } from "../../../components/forms/Form";
import { useLogin } from "../../../hooks";

export default function LoginCLP() {
	const { register_number, password, isLoading, onChange, onSubmit } =
		useLogin();

	const config: Config[] = [
		{
			labelText: "CNPJ",
			labelId: "register_number",
			type: "only-numbers",
			value: register_number,
			maxLength: 14
		},
		{
			labelText: "Password",
			labelId: "password",
			secureTextEntry: true,
			value: password,
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
