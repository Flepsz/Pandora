import { ChangeEvent, FormEvent } from "react";
import Input2 from "./Input2";
import ModalPage from "./ModalPage";

interface Config {
	labelText: string;
	labelId: string;
	type: string;
	value: string;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
}

interface Props {
	isRegister?: boolean;
	isCustomerNP?: boolean;
	config: Config[];
	isLoading: boolean;
	btnText: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
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
				<Input2
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={onChange}
					value={input.value}
					link={input.link}
					required={input.required}
				>
					{input.labelText}
				</Input2>
			))}
		</ModalPage>
	);
}
