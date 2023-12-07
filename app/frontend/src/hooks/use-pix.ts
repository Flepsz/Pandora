import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  useRegisterPixMutation,
  useRegisterTransactionMutation,
} from "../redux/features/authApiSlice";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../redux/hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { useSelector } from "react-redux";
import { selectAccount } from "../redux/features/authSlice";

interface UseRegisterTransactionProps {
  initialCard?: string;
}

export default function useRegisterPix({
  initialCard = "",
}: UseRegisterTransactionProps = {}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [register, { isLoading }] = useRegisterPixMutation();

  const accountd = useSelector(selectAccount);

  const [formData, setFormData] = useState({
    account: accountd,
    amount: "",
    receiver: "",
  });

  const { account, amount, receiver } = formData;

  const onChange = (text: string, name: string) => {
    setFormData({ ...formData, [name]: text });
  };

  const onSubmit = () => {
    register({ account, amount, receiver })
      .unwrap()
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Pix realized with success",
        });

        navigation.navigate("Main");
      })
      .catch((error) => {
        Toast.show({ type: "error", text1: "Failed to do Pix" });
        console.log(error);
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
