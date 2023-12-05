import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/features/authApiSlice";
import { setAuth, setRegisterNumber } from "../redux/features/authSlice";
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

export default function useLogin() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    register_number: "",
    password: "",
  });

  const { register_number, password } = formData;

  const onChange = (text: string, name: string) => {
    setFormData({ ...formData, [name]: text });
  };

  const onSubmit = () => {
    login({ register_number, password })
      .unwrap()
      .then((data) => {
        dispatch(setAuth({ access: data.access, refresh: data.refresh }));
        dispatch(setRegisterNumber(register_number));

        Toast.show({type: "success", text1: "Logged in"});
        navigation.navigate("Main");
      })
      .catch((error) => {
        Toast.show({type: "error", text1: "Failed to log in"});

        console.log(error);
      });
  };

  return {
    register_number,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
