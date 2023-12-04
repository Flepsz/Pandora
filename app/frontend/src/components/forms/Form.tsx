import InputC from "./Input";
import ModalPage from "./ModalPage";

interface Config {
	labelText: string;
	labelId: string;
	value: string;
}

interface Props {
	isRegister?: boolean;
	isCustomerNP?: boolean;
	config: Config[];
	isLoading: boolean;
	btnText: string;
	onChange: (name: string, value: string) => void;
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
					onChange={(value) => onChange(input.labelId, input.value)}
					value={input.value}
				>
					{input.labelText}
				</InputC>
			))}
		</ModalPage>
	);
}
