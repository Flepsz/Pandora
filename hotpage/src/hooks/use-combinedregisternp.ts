import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
	useRegisterMutation,
	useRegisterCNPMutation,
} from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function useCombinedRegisterCNP() {
	const router = useRouter();
	const [register, { isLoading: authLoading }] = useRegisterMutation();
	const [registerCNP, { isLoading }] = useRegisterCNPMutation();
  
	const [formData, setFormData] = useState({
		last_name: "a",
		register_number: "",
		password: "",
		name: "",
		social_name: "",
		rg: "",
		birthdate: "",
	});

	const {
		last_name,
		register_number,
		password,
		name,
		social_name,
		rg,
		birthdate,
	} = formData

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		register({ first_name: name, last_name, register_number, password })
			.unwrap()
			.then(() => {
				toast.success("Please check register_number to verify account");

				registerCNP({ customer: register_number, name, social_name, cpf: register_number, rg, birthdate })
					.unwrap()
					.then(() => {
						toast.success("Register your Customer NP with Success");
						router.push("/test/login/customernp");
					})
					.catch((cnpError) => {
						toast.error("Failed to register Customer NP:", cnpError);
						console.log(cnpError);
					});
			})
			.catch((error) => {
				toast.error("Failed to register account:", error);
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
		authLoading
	};
}
