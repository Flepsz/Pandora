import InputC from "./Input";
import ModalPage from "./ModalPage";

interface Config {
	labelText: string;
	labelId: string;
	value: string;
	secureTextEntry?: boolean;
}

interface Props {
	isRegister?: boolean;
	isCustomerNP?: boolean;
	config: Config[];
	isLoading: boolean;
	btnText: string;
	onChange: (text: string, labelId: string) => void;
	onSubmit: () => void;
}

export default function Form({
	isRegister,
	isCustomerNP,
	config,
	isLoading,
	btnText,
	onChange,
	onSubmit,
}: Props) {
	return (
		<ModalPage
			btnText={btnText}
			isLoading={isLoading}
			onSubmit={onSubmit}
			isCustomerNP={isCustomerNP}
			isRegister={isRegister}
		>
			{config.map((input) => (
				<InputC
					key={input.labelId}
					labelId={input.labelId}
					onChange={(text) => onChange(text, input.labelId)}
					value={input.value}
					secureTextEntry={input.secureTextEntry}
				>
					{input.labelText}
				</InputC>
			))}
		</ModalPage>
	);
}
