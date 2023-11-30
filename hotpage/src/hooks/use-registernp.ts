import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

export default function useRegisterNP() {
	const router = useRouter();
	const [register, { isLoading }] = useRegisterMutation();

	const [formData, setFormData] = useState({
		customer: '',
		name: '',
		social_name: '',
		cpf: '',
    rg: '',
    birthdate: ''
	});

	const { customer, name, social_name, cpf, rg, birthdate } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		register({ customer, name, social_name, cpf, rg, birthdate })
			.unwrap()
			.then(() => {
				toast.success('Register your Customer NP with Success');
				router.push('/auth/login');
			})
			.catch(() => {
				toast.error('Failed to register account');
			});
	};

	return {
		customer,
		name,
		social_name,
		cpf,
    rg,
    birthdate,
		isLoading,
		onChange,
		onSubmit,
	};
}
