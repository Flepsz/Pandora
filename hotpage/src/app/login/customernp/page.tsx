"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Form from "@/components/forms/Form";
import { useLogin } from "@/hooks";
import Image from "next/image";

export default function RegisterNPPage() {
	const {register_number, password, isLoading, onChange, onSubmit} = useLogin();

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
					<Form config={config} btnText="Log In" isLoading={isLoading} onChange={onChange} onSubmit={onSubmit} isCustomerNP />
					</section>
				</div>
			</main>
		</>
	);
}
