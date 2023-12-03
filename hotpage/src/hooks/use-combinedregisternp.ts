import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  useRegisterMutation,
  useRegisterCNPMutation,
  useLoginMutation,
} from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";
import { logout, setAuth, setRegisterNumber } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function useCombinedRegisterCNP() {
  const router = useRouter();
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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    register({ first_name: name, last_name: social_name, register_number, password })
      .unwrap()
      .then(() => {
        toast.success("User created with success");

				console.log("Dados enviados para login:", { register_number, password });

        login({ register_number, password })
          .unwrap()
          .then((data) => {
            dispatch(setAuth({ access: data.access, refresh: data.refresh }));
            dispatch(setRegisterNumber(register_number));
            toast.success("Logged in");

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
                toast.success("Register your Customer NP with Success");
								dispatch(logout())
                router.push("/test/login/customernp");
              })
              .catch((cnpError) => {
                toast.error("Failed to register Customer NP");
                console.log(cnpError);
              });
          })
          .catch(() => {
            toast.error("Failed to log in");
          });
      })
      .catch((error) => {
        toast.error("Failed to register user");
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
