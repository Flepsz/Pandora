import Form from "../../../components/forms/Form";
import { useLogin } from "../../../hooks";

export default function LoginCLP() {
  const { register_number, password, isLoading, onChange, onSubmit } =
    useLogin();

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
