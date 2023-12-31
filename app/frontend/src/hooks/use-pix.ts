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

export default function useRegisterPix() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [register, { isLoading }] = useRegisterPixMutation();

  const accountd = useSelector(selectAccount);
  console.log(accountd);
  

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
    console.log({ account, amount, receiver });
    
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
        const errorMessage = error.data.status;
				Toast.show({
					type: "error",
					text1: "Failed to do Pix",
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
