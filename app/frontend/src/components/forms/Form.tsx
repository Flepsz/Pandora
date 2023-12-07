import { TextInputMaskTypeProp } from "react-native-masked-text";
import InputC from "./Input";
import ModalPage from "./ModalPage";

export interface Config {
	labelText: string;
	labelId: string;
	value: string;
	type?: TextInputMaskTypeProp;
	secureTextEntry?: boolean;
	maxLength?: number
}

interface Props {
	isRegister?: boolean;
	registractionLogin?: boolean;
	isCustomerNP?: boolean;
	config: Config[];
	isLoading: boolean;
	btnText: string;
	titleText?: string;
	onChange: (text: string, labelId: string) => void;
	onSubmit: () => void;
}

export default function Form({
	isRegister,
	isCustomerNP,
	config,
	isLoading,
	btnText,
	titleText,
	onChange,
	onSubmit,
	registractionLogin
}: Props) {
	return (
		<ModalPage
			btnText={btnText}
			isLoading={isLoading}
			onSubmit={onSubmit}
			isCustomerNP={isCustomerNP}
			isRegister={isRegister}
			registractionLogin={registractionLogin}
			titleText={titleText}
		>
			{config.map((input) => (
				<InputC
					labelText={input.labelText}
					key={input.labelId}
					labelId={input.labelId}
					onChange={(text) => onChange(text, input.labelId)}
					value={input.value}
					type={input.type}
					secureTextEntry={input.secureTextEntry}
					maxLength={input.maxLength}
				>
					{input.labelText}
				</InputC>
			))}
		</ModalPage>
	);
}
