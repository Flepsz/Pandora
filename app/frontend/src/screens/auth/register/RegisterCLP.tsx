import Form, { Config } from "../../../components/forms/Form";
import useCombinedRegisterCLP from "../../../hooks/use-combinedregisterlp";

export default function RegisterCLP() {
  const {
    fantasy_name,
    password,
    register_number,
    sr,
    mr,
    establishment_date,
    isLoading,
    onChange,
    onSubmit,
  } = useCombinedRegisterCLP();

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
      value: password,
      secureTextEntry: true,
    },
    {
      labelText: "Fantasy Name",
      labelId: "fantasy_name",
      value: fantasy_name,
    },
    {
      labelText: "State Registration",
      labelId: "sr",
      type: "only-numbers",
      value: sr,
      maxLength: 9
    },
    {
      labelText: "Municipal Registration",
      labelId: "mr",
      type: "only-numbers",
      value: mr,
      maxLength: 11
    },
    {
      labelText: "Establishment Date",
      labelId: "establishment_date",
      type: "datetime",
      value: establishment_date,
    },
  ];

  return (
    <Form
      config={config}
      btnText="Register"
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
      isRegister
    />
  );
}
