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

export default function useCombinedRegisterCLP() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [register, { isLoading: authLoading }] = useRegisterMutation();
	const [registerCLP, { isLoading }] = useRegisterCLPMutation();
	const [login, { isLoading: loginLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		last_name: "a",
		register_number: "",
		password: "",
		fantasy_name: "",
		cnpj: "",
		sr: "",
		mr: "",
		establishment_date: "",
	});

	const {
		last_name,
		register_number,
		password,
		fantasy_name,
		cnpj,
		sr,
		mr,
		establishment_date,
	} = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		register({ first_name: fantasy_name, last_name, register_number, password })
			.unwrap()
			.then(() => {
				toast.success("User created with success");

				login({ register_number, password })
          .unwrap()
          .then((data) => {
            dispatch(setAuth({ access: data.access, refresh: data.refresh }));
            dispatch(setRegisterNumber(register_number));
            toast.success("Logged in");						
					
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
								dispatch(logout())
								router.push("/test/login/customerlp");
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
