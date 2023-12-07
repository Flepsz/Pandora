import { View } from "tamagui";
import useCombinedRegisterCNP from "../../../hooks/use-combinedregisternp";
import Form, { Config } from "../../../components/forms/Form";

export default function RegisterCNP() {
  const { name, social_name, register_number, password, rg, birthdate, isLoading, onChange, onSubmit} = useCombinedRegisterCNP();

	const config: Config[] = [
		{
			labelText: 'CPF',
			labelId: 'register_number',
			type: "only-numbers",
			value: register_number,
			maxLength: 11
		},
		{
			labelText: 'Password',
			labelId: 'password',
			value: password,
			secureTextEntry: true,
		},
		{
			labelText: 'Name',
			labelId: 'name',
			value: name,
		},
		{
			labelText: 'Social name',
			labelId: 'social_name',
			value: social_name,
		},
		{
			labelText: 'RG',
			labelId: 'rg',
			type: 'only-numbers',
			value: rg,
			maxLength: 9
		},
		{
			labelText: 'Birthdate',
			labelId: 'birthdate',
			value: birthdate,
			maxLength: 10
		},
	]

  return (
    <View>
      <Form config={config} btnText="Register" isLoading={isLoading} onChange={onChange} onSubmit={onSubmit} titleText="Register for your account" isCustomerNP isRegister registractionLogin />
    </View>
  )
}
