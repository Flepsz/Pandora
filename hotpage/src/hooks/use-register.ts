import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

// Custom hook for handling user registration
export default function useRegister() {
  // Next.js router instance
  const router = useRouter();

  // Mutation hook for user registration
  const [register, { isLoading }] = useRegisterMutation();

  // State to manage form data
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    register_number: '',
    password: '',
  });

  const { first_name, last_name, register_number, password } = formData;

  // Event handler for input changes
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Update form data
    setFormData({ ...formData, [name]: value });
  };

  // Event handler for form submission
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform user registration
    register({ first_name, last_name, register_number, password })
      .unwrap()
      .then(() => {
        // Display success message and redirect to the login page
        toast.success('Please check your email to verify your account');
        router.push('/auth/login');
      })
      .catch(() => {
        // Display error message in case of registration failure
        toast.error('Failed to register account');
      });
  };

  // Return necessary data and functions for the component
  return {
    first_name,
    last_name,
    register_number,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
