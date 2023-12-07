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

// Custom hook for handling combined registration and login for Customer NP
export default function useCombinedRegisterCNP() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Mutation hooks for registration, login, and Customer NP registration
  const [register, { isLoading: authLoading }] = useRegisterMutation();
  const [registerCNP, { isLoading }] = useRegisterCNPMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();

  // State to manage form data
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

  // Event handler for input changes
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Event handler for form submission
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Register the user
    register({ register_number, password })
      .unwrap()
      .then(() => {
        toast.success("User created with success");

        console.log("Data sent for login:", { birthdate, password });

        // Login the user
        login({ register_number, password })
          .unwrap()
          .then((data) => {
            // Set authentication and register number in the Redux store
            dispatch(setAuth({ access: data.access, refresh: data.refresh }));
            dispatch(setRegisterNumber(register_number));
            toast.success("Logged in");

            // Register the Customer NP
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
                dispatch(logout());
                router.push("/login/customernp");
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

  // Return the necessary data and functions for the component
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
