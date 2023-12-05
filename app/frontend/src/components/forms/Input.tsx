import DatePicker from 'react-native-date-picker'
import { NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from "react-native";
import { Label, View, Input, Text } from "tamagui";
import { useState } from 'react';

interface Props {
	labelId: string;
	onChange: (text: string, labelId: string) => void;
	value: string;
	valueDate?: Date;
	children: React.ReactNode;
	required?: boolean;
	secureTextEntry?: boolean;
	date?: boolean;
}

export default function InputC({
	labelId,
	onChange,
	value,
	children,
  secureTextEntry,
	date,
	valueDate
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
				{!date ? (
					<Input
					id={labelId}
					className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-purple-100 ring-inset placeholder:text-gray-400 focus:border-purple-d focus:ring-purple-d focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
					onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) => onChange(event.nativeEvent.text, labelId)}
					value={value}
          secureTextEntry={secureTextEntry}
				/>
				) : (
					<DatePicker date={valueDate} onDateChange={handleDateChange} />
				)}
			</View>
		</View>
	);
}
