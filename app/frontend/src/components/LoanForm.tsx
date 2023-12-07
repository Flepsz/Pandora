import useRegisterLoan from "../hooks/use-registerloan";
import Form, { Config } from "./forms/Form";

export default function LoanForm() {
  const { installment_number, requested_amount, observation, isLoading, onChange, onSubmit } =
		useRegisterLoan();

	const config: Config[] = [
		{
			labelText: "Amount",
			labelId: "requested_amount",
			type: "only-numbers",
			value: requested_amount,
		},
		{
			labelText: "Number of Installments",
			labelId: "installment_number",
      type: "only-numbers",
			value: installment_number,
      maxLength: 2
		},
    {
			labelText: "Observation",
			labelId: "observation",
			value: observation,
		},
	];

	return (
		<Form
			config={config}
			btnText="Request"
			isLoading={isLoading}
			onChange={onChange}
			onSubmit={onSubmit}
			titleText="Request a Loan"
		/>
	);
}
