import Form from "../../../components/forms/Form";
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

  const config = [
    {
      labelText: "CNPJ",
      labelId: "register_number",
      type: "text",
      value: register_number,
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "text",
      value: password,
      required: true,
    },
    {
      labelText: "Fantasy Name",
      labelId: "fantasy_name",
      type: "text",
      value: fantasy_name,
      required: true,
    },
    {
      labelText: "State Registration",
      labelId: "sr",
      type: "text",
      value: sr,
      required: true,
    },
    {
      labelText: "Municipal Registration",
      labelId: "mr",
      type: "text",
      value: mr,
      required: true,
    },
    {
      labelText: "Establishment Date",
      labelId: "establishment_date",
      type: "date",
      value: establishment_date,
      required: true,
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
