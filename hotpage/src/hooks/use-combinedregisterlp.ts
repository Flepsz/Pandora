import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  useRegisterMutation,
  useRegisterCNPMutation,
  useLoginMutation,
  useRegisterCLPMutation,
} from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { logout, setAuth, setRegisterNumber } from "@/redux/features/authSlice";

// Custom hook for handling combined registration and login for Customer LP
export default function useCombinedRegisterCLP() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Mutation hooks for registration, login, and Customer LP registration
  const [register, { isLoading: authLoading }] = useRegisterMutation();
  const [registerCLP, { isLoading }] = useRegisterCLPMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();

  // State to manage form data
  const [formData, setFormData] = useState({
    register_number: "",
    password: "",
    fantasy_name: "",
    cnpj: "",
    sr: "",
    mr: "",
    establishment_date: "",
  });

  const {
    register_number,
    password,
    fantasy_name,
    cnpj,
    sr,
    mr,
    establishment_date,
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

        // Login the user
        login({ register_number, password })
          .unwrap()
          .then((data) => {
            // Set authentication and register number in the Redux store
            dispatch(setAuth({ access: data.access, refresh: data.refresh }));
            dispatch(setRegisterNumber(register_number));
            toast.success("Logged in");

            // Register the Customer LP
            registerCLP({
              customer: register_number,
              fantasy_name,
              cnpj: register_number,
              sr,
              mr,
              establishment_date,
            })
              .unwrap()
              .then(() => {
                toast.success("Register your Customer LP with Success");
                // Logout the user and redirect to Customer LP login
                dispatch(logout());
                router.push("/login/customerlp");
              })
              .catch(() => {
                toast.error("Failed to register Customer LP");
              });
          })
          .catch(() => {
            toast.error("Failed to log in");
          });
      })
      .catch(() => {
        toast.error("Failed to register user");
      });
  };

  // Return the necessary data and functions for the component
  return {
    register_number,
    password,
    fantasy_name,
    cnpj,
    sr,
    mr,
    establishment_date,
    isLoading,
    onChange,
    onSubmit,
    authLoading,
  };
}
