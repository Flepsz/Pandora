"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import useRegisterNP from "@/hooks/use-registernp";
import Form from "@/components/forms/Form";

export default function RegisterNPPage() {
	const {customer, name, social_name, cpf, rg, birthdate, isLoading, onChange, onSubmit} = useRegisterNP();

	const config = [
		{
			labelText: 'Customer',
			labelId: 'customer',
			type: 'text',
			value: customer,
			required: true,
		},
		{
			labelText: 'Name',
			labelId: 'name',
			type: 'text',
			value: name,
			required: true,
		},
		{
			labelText: 'Social name',
			labelId: 'social_name',
			type: 'text',
			value: social_name,
			required: true,
		},
		{
			labelText: 'CPF',
			labelId: 'cpf',
			type: 'text',
			value: cpf,
			required: true,
		},
		{
			labelText: 'RG',
			labelId: 'rg',
			type: 'text',
			value: rg,
			required: true,
		},
		{
			labelText: 'Birthdate',
			labelId: 'birthdate',
			type: 'text',
			value: birthdate,
			required: true,
		},
	]
	
	return (
		<>
			<Navbar />
			<main className="w-full pt-24">
				<Form config={config} btnText="Log In" isLoading={isLoading} onChange={onChange} onSubmit={onSubmit} isCustomerNP />
			</main>
		</>
	);
}
