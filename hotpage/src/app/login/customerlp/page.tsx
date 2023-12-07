"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Form from "@/components/forms/Form";
import useCombinedRegisterCLP from "@/hooks/use-combinedregisterlp";
import Image from "next/image";
import { useLogin } from "@/hooks";

export default function RegisterLPPage() {
  // Destructuring values from the useLogin hook
  const { register_number, password, isLoading, onChange, onSubmit } = useLogin();

  // Configuration array for the Form component
  const config = [
    {
      labelText: "CNPJ",
      labelId: "register_number",
      type: "text",
      value: register_number,
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "text",
      value: password,
      required: true,
    },
  ];

  // Rendering the RegisterLPPage component
  return (
    <>
      <Navbar />
      <main className="w-full pt-24">
        <div className="flex h-[calc(100vh-6rem)] bg-blackp">
          {/* Left section with Neymar image (hidden on md screens) */}
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
          {/* Right section with the login Form */}
          <section className="w-full">
            <Form
              config={config}
              btnText="Log In"
              isLoading={isLoading}
              onChange={onChange}
              onSubmit={onSubmit}
            />
          </section>
        </div>
      </main>
    </>
  );
}
