import { TextInput, View, Text } from "react-native";

interface InputProps {
	id: string;
	onChange: any;
	value: string;
	label: string;
	type?: string;
}

export default function InputM({
	id,
	onChange,
	value,
	label,
}: InputProps) {
	return (
		<View className="relative">
			<TextInput
				onChange={(e) => {
					onChange(e.target.valueOf);
				}}
				value={value}
				id={id}
				className="
        block
        rounded-md
        px-6
        pt-6
        pb-1
        w-full
        text-md
        text-white
        bg-[#333333]
        appearance-none
        focus:outline-none
        transition
        focus:bg-neutral-700
        focus:ring-0
        peer
        "
				placeholder=" "
			/>
			<Text
				className="
        absolute
        text-md
        text-zinc-400
        duration-150
        transform
        -translate-y-3
        scale-75
        top-4
        z-10
        origin-[0]
        left-6
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3
      "
			>
				{label}
			</Text>
		</View>
	);
}
