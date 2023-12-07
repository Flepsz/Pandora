import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { setAuth, setRegisterNumber } from "@/redux/features/authSlice";
import { toast } from "react-toastify";

// Custom hook for handling user login
export default function useLogin() {
  // Next.js router instance
  const router = useRouter();

  // Redux dispatch function
  const dispatch = useAppDispatch();

  // Mutation hook for user login
  const [login, { isLoading }] = useLoginMutation();

  // State to manage form data
  const [formData, setFormData] = useState({
    register_number: "",
    password: "",
  });

  const { register_number, password } = formData;

  // Event handler for input changes
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Update form data
    setFormData({ ...formData, [name]: value });
  };

  // Event handler for form submission
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform user login
    login({ register_number, password })
      .unwrap()
      .then((data) => {
        // Set authentication and register number in the Redux store
        dispatch(setAuth({ access: data.access, refresh: data.refresh }));
        dispatch(setRegisterNumber(register_number));

        // Display success message and redirect to the accounts page
        toast.success("Logged in");
        router.push("/accounts");
      })
      .catch((error) => {
        // Display error message in case of login failure
        toast.error("Failed to log in");
        console.log(error);
      });
  };

  // Return necessary data and functions for the component
  return {
    register_number,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
