import { View } from "tamagui";
import Form, { Config } from "../forms/Form";
import useRegisterTransaction from "../../hooks/use-transaction";

export default function CardTransaction({cardNumber}: {cardNumber: string}) {
  const { receiver, amount, isLoading, onChange, onSubmit } =
    useRegisterTransaction({initialCard: cardNumber});


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
        titleText="Do your card transaction"
      />
    </View>
  );
}
