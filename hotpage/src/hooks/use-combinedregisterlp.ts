import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
	useRegisterMutation,
	useRegisterCNPMutation,
} from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function useCombinedRegisterCLP() {
	const router = useRouter();
	const [register, { isLoading: authLoading }] = useRegisterMutation();
	const [registerCNP, { isLoading }] = useRegisterCNPMutation();

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
				toast.success("Please check register_number to verify account");

				registerCNP({
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
						router.push("/test/login/customerlp");
					})
					.catch(() => {
						toast.error("Failed to register Customer NP");
					});
			})
			.catch(() => {
				toast.error("Failed to register account");
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
