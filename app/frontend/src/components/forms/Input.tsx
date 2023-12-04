import { ChangeEvent } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Label, View, Input } from "tamagui";

interface Props {
	labelId: string;
	onChange: (name: string, value: string) => void;
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
  secureTextEntry
}: Props) {
	return (
		<View>
			<View className="flex justify-between align-center">
				<Label
					htmlFor={labelId}
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					{children}
				</Label>
				
			</View>
			<View className="mt-2">
				<Input
					id={labelId}
					className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-purple-100 ring-inset placeholder:text-gray-400 focus:border-purple-d focus:ring-purple-d focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
					onChange={(text) => onChange(labelId, value)}
					value={value}
          secureTextEntry={secureTextEntry}
				/>
			</View>
		</View>
	);
}
