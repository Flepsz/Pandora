import { View } from "tamagui";
import useCombinedRegisterCNP from "../../../hooks/use-combinedregisternp";
import Form from "../../../components/forms/Form";

export default function RegisterCNP() {
  const { name, social_name, register_number, password, rg, birthdate, isLoading, onChange, onSubmit} = useCombinedRegisterCNP();

	const config = [
		{
			labelText: 'CPF',
			labelId: 'register_number',
			type: 'text',
			value: register_number,
			required: true,
		},
		{
			labelText: 'Password',
			labelId: 'password',
			type: 'text',
			value: password,
			secureTextEntry: true,
			required: true,
		},
		{
			labelText: 'Name',
			labelId: 'name',
			type: 'text',
			value: name,
			required: true,
		},
		{
			labelText: 'Social name',
			labelId: 'social_name',
			type: 'text',
			value: social_name,
			required: true,
		},
		{
			labelText: 'RG',
			labelId: 'rg',
			type: 'text',
			value: rg,
			required: true,
		},
		{
			labelText: 'Birthdate',
			labelId: 'birthdate',
			type: 'date',
			valueDate: birthdate,
			date: true,
			required: true,
		},
	]

  return (
    <View>
      <Form config={config} btnText="Register" isLoading={isLoading} onChange={onChange} onSubmit={onSubmit} isCustomerNP isRegister/>
    </View>
  )
}
