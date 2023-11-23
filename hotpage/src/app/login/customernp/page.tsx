"use client";
import React from "react";
import RegisterLoginPage from "@/components/RegisterPage";
import Navbar from "@/components/Navbar";

export default function RegisterNPPage() {
	return (
		<>
			<Navbar />
			<main className="w-full pt-24">
				<RegisterLoginPage isCustomerNP />
			</main>
		</>
	);
}
