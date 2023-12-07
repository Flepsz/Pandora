import { useRegisterLoansMutation } from "../redux/features/authApiSlice";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { selectAccount } from "../redux/features/authSlice";
import { useState } from "react";

export default function useRegisterLoan() {
	const [register, { isLoading }] = useRegisterLoansMutation();

	const accountR = useSelector(selectAccount);

	const [formData, setFormData] = useState({
		account: accountR,
		requested_amount: "",
		installment_number: "",
		observation: "",
	});

	const { account, requested_amount, installment_number, observation } =
		formData;

	const onChange = (text: string, name: string) => {
		setFormData({ ...formData, [name]: text });
	};

	const onSubmit = () => {
		register({ account, requested_amount, installment_number, observation })
			.unwrap()
			.then(() => {
				Toast.show({ type: "success", text1: "Loan created with success" });
			})
			.catch((error) => {
				const errorMessage = error.data.status;
				Toast.show({
					type: "error",
					text1: "Failed to register Loan",
					text2: errorMessage,
				});
			});
	};

	return {
		requested_amount,
		installment_number,
		observation,
		onChange,
		isLoading,
		onSubmit,
	};
}
