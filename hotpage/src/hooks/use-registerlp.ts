import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useRegisterCLPMutation } from '@/redux/features/authApiSlice';

export default function useRegisterLP() {
	const router = useRouter();
	const [registerCLP, { isLoading }] = useRegisterCLPMutation();

	const [formData, setFormData] = useState({
		customer: '',
		fantasy_name: '',
		cnpj: '',
		sr: '',
    mr: '',
    establishment_date: ''
	});

	const { customer, fantasy_name, cnpj, sr, mr, establishment_date } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		registerCLP({ customer, fantasy_name, cnpj, sr, mr, establishment_date })
			.unwrap()
			.then(() => {
				toast.success('Register your Customer LP with Success');
				router.push('/auth/login');
			})
			.catch(() => {
				toast.error('Failed to register account');
			});
	};

	return {
		customer,
		fantasy_name,
		cnpj,
		sr,
    mr,
    establishment_date,
		isLoading,
		onChange,
		onSubmit,
	};
}
