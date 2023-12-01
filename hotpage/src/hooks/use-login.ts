import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { setAuth, setRegisterNumber } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';

export default function useLogin() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		register_number: '',
		password: '',
	});

	const { register_number, password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		login({ register_number, password })
			.unwrap()
			.then(() => {
				dispatch(setAuth());
				dispatch(setRegisterNumber(register_number));
				toast.success('Logged in');
				router.push('/accounts');
			})
			.catch(() => {
				toast.error('Failed to log in');
			});
	};

	return {
		register_number,
		password,
		isLoading,
		onChange,
		onSubmit,
	};
}
