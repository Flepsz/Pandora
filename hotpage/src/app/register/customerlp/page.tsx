"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Form from "@/components/forms/Form";
import useCombinedRegisterCLP from "@/hooks/use-combinedregisterlp";
import Image from "next/image";

export default function RegisterLPPage() {
  // Destructuring values from the useCombinedRegisterCLP hook
  const {
    fantasy_name,
    password,
    register_number,
    sr,
    mr,
    establishment_date,
    isLoading,
    onChange,
    onSubmit,
  } = useCombinedRegisterCLP();

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
    {
      labelText: "Fantasy Name",
      labelId: "fantasy_name",
      type: "text",
      value: fantasy_name,
      required: true,
    },
    {
      labelText: "State Registration",
      labelId: "sr",
      type: "text",
      value: sr,
      required: true,
    },
    {
      labelText: "Municipal Registration",
      labelId: "mr",
      type: "text",
      value: mr,
      required: true,
    },
    {
      labelText: "Establishment Date",
      labelId: "establishment_date",
      type: "date",
      value: establishment_date,
      required: true,
    },
  ];

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
          {/* Right section with the registration Form */}
          <section className="w-full">
            {/* Passing additional prop isRegister to Form component */}
            <Form
              config={config}
              btnText="Register"
              isLoading={isLoading}
              onChange={onChange}
              onSubmit={onSubmit}
              isRegister
            />
          </section>
        </div>
      </main>
    </>
  );
}
