import { useNavigation } from '@react-navigation/native';
import Spinner from '../common/Spinner';
import { useAppSelector } from '../../redux/hooks';
import { View } from 'tamagui';
import { useEffect } from 'react';
import { RootStackParamList } from '../../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

	useEffect(() => {
		if (!isAuthenticated) {
			navigation.navigate('Auth');
		}
	}, [isLoading, isAuthenticated, navigation])
	

	if (isLoading) {
		return (
			<View className='flex justify-center my-8'>
				<Spinner lg />
			</View>
		);
	}

	return isAuthenticated ? <>{children}</> : null;
}
