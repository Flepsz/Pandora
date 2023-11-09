import Navbar from "@/components/Navbar";
import RegisterLoginPage from "@/components/RegisterPage";
import React from "react";

export default function RegisterPagee() {
	return (
		<>
			<Navbar />
			<main className="w-full pt-24">
				<RegisterLoginPage isRegister />
			</main>
		</>
	);
}
