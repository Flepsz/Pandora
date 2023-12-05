import DatePicker from 'react-native-date-picker'
import { NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from "react-native";
import { Label, View, Input, Text } from "tamagui";

interface Props {
	labelId: string;
	onChange: (text: string , labelId: string) => void;
	value: string;
	children: React.ReactNode;
	required?: boolean;
	secureTextEntry?: boolean;
}

export default function InputC({
	labelId,
	onChange,
	value,
	children,
  secureTextEntry,
}: Props) {
	const handleDateChange = (newDate: Date) => {
    const dateString = newDate.toISOString().split('T')[0];
    onChange(dateString, labelId);
  };

	return (
		<View>
			<View className="flex justify-between align-center">
				<Label
					htmlFor={labelId}
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					<Text className="text-white">{children}</Text>
				</Label>
				
			</View>
			<View className="">
					<Input
					id={labelId}
					className="block w-full bg-zinc-700 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-purple-800 ring-inset placeholder:text-white focus:border-purple-d focus:ring-purple-d focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
					onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) => onChange(event.nativeEvent.text, labelId)}
					value={value}
          secureTextEntry={secureTextEntry}
				/>
			</View>
		</View>
	);
}
