"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Form from "@/components/forms/Form";
import useCombinedRegisterCNP from "@/hooks/use-combinedregisternp";
import Image from "next/image";

export default function RegisterNPPage() {
	const { name, social_name, register_number, password, rg, birthdate, isLoading, onChange, onSubmit} = useCombinedRegisterCNP();

	const config = [
		{
			labelText: 'CPF',
			labelId: 'register_number',
			type: 'text',
			value: register_number,
			required: true,
		},
		{
			labelText: 'Password',
			labelId: 'password',
			type: 'text',
			value: password,
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
			labelText: 'RG',
			labelId: 'rg',
			type: 'text',
			value: rg,
			required: true,
		},
		{
			labelText: 'Birthdate',
			labelId: 'birthdate',
			type: 'date',
			value: birthdate,
			required: true,
		},
	]
	
	return (
		<>
		<Navbar />
		<main className="w-full pt-24">
			<div className="flex h-[calc(100vh-6rem)] bg-blackp">
				<section className="w-[45%] h-full hidden md:block">
					<div className="h-full">
						<Image
							src="/neymar.svg"
							width={500}
							height={500}
							alt="Neymar Jr"
							className="object-cover w-full h-full"
						/>
					</div>
				</section>
				<section className="w-full">
				<Form config={config} btnText="Register" isLoading={isLoading} onChange={onChange} onSubmit={onSubmit} isCustomerNP isRegister/>
				</section>
			</div>
		</main>
	</>
	);
}
