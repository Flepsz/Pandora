import { useVerify } from '../../hooks';
import ToastManager from 'toastify-react-native'
import 'react-toastify/dist/ReactToastify.css';

export default function Setup() {
	useVerify();

	return <ToastManager />;
}
