import { View } from "tamagui";
import Form, { Config } from "../components/forms/Form";
import useRegisterPix from "../hooks/use-pix";

export default function PixScreen() {
  const { receiver, amount, isLoading, onChange, onSubmit } = useRegisterPix();

  const config: Config[] = [
    {
      labelText: "Amount",
      labelId: "amount",
      type: "only-numbers",
      value: amount,
    },
    {
      labelText: "Receiver",
      labelId: "receiver",
      value: receiver,
    },
  ];

  return (
    <View>
      <Form
        config={config}
        btnText="Pay"
        isLoading={isLoading}
        onChange={onChange}
        onSubmit={onSubmit}
        titleText="Do you Pix"
      />
    </View>
  );
}
