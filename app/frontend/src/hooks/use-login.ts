import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/features/authApiSlice";
import { setAuth, setRegisterNumber } from "../redux/features/authSlice";
import { Toast } from 'toastify-react-native'
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

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    login({ register_number, password })
      .unwrap()
      .then((data) => {
        dispatch(setAuth({ access: data.access, refresh: data.refresh }));
        dispatch(setRegisterNumber(register_number));
        Toast.success("Logged in");
        navigation.navigate("Main");
      })
      .catch((error) => {
        Toast.error("Failed to log in", "top");
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
