import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRegisterTransactionMutation } from "../redux/features/authApiSlice";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../redux/hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

interface UseRegisterTransactionProps {
  initialCard?: string;
}

export default function useRegisterTransaction({
  initialCard = "",
}: UseRegisterTransactionProps = {}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [register, { isLoading }] = useRegisterTransactionMutation();

  const [formData, setFormData] = useState({
    card: initialCard.cardNumber,
    amount: "",
    operation: "Deposit",
    receiver: "",
  });

  const { card, amount, operation, receiver } = formData;

  const onChange = (text: string, name: string) => {
    setFormData({ ...formData, [name]: text });
  };

  const onSubmit = () => {
    console.log(card, amount, operation, receiver);
    register({ card, amount, operation, receiver })
      .unwrap()
      .then(() => {
        Toast.show({ type: "success", text1: "Transfer realized with success" });

        navigation.navigate("Main")
      })
      .catch((error) => {
        const errorMessage = error.data.status;
				Toast.show({
					type: "error",
					text1: "Failed to do transfer",
					text2: errorMessage,
				});
      });
  };

  return {
    receiver,
    amount,
    isLoading,
    onChange,
    onSubmit,
  };
}
