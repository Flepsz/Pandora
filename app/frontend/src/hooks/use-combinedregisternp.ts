import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  useRegisterMutation,
  useRegisterCNPMutation,
  useLoginMutation,
} from "../redux/features/authApiSlice";
import { Toast } from 'toastify-react-native'
import { logout, setAuth, setRegisterNumber } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

export default function useCombinedRegisterCNP() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [register, { isLoading: authLoading }] = useRegisterMutation();
  const [registerCNP, { isLoading }] = useRegisterCNPMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    register_number: "",
    password: "",
    name: "",
    social_name: "",
    rg: "",
    birthdate: "",
  });

  const {
    register_number,
    password,
    name,
    social_name,
    rg,
    birthdate,
  } = formData;

  const onChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    register({ first_name: name, last_name: social_name, register_number, password })
      .unwrap()
      .then(() => {
        Toast.success("User created with success");

				console.log("Dados enviados para login:", { register_number, password });

        login({ register_number, password })
          .unwrap()
          .then((data) => {
            dispatch(setAuth({ access: data.access, refresh: data.refresh }));
            dispatch(setRegisterNumber(register_number));
            Toast.success("Logged in");

            registerCNP({
              customer: register_number,
              name,
              social_name,
              cpf: register_number,
              rg,
              birthdate,
            })
              .unwrap()
              .then(() => {
                Toast.success("Register your Customer NP with Success");
								dispatch(logout())
                navigation.navigate("LoginCNP");
              })
              .catch((cnpError) => {
                Toast.error("Failed to register Customer NP", "top");
                console.log(cnpError);
              });
          })
          .catch(() => {
            Toast.error("Failed to log in", "top");
          });
      })
      .catch((error) => {
        Toast.error("Failed to register user", "top");
        console.log(error);
      });
  };

  return {
    register_number,
    password,
    name,
    social_name,
    rg,
    birthdate,
    isLoading,
    onChange,
    onSubmit,
    authLoading,
  };
}
