"use client"
import React from "react";

interface InputPropsI {
	placeholder: string;
	label: string;
	onChange: any;
	value: string;
	type?: string;
	objectzod: any;
}

export default function Input({
	type,
	placeholder,
	label,
	onChange,
	value,
	objectzod
}: InputPropsI) {
	return (
		<div className="relative" data-te-input-wrapper-init>
			<input
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					onChange(e.target.value);
				}}
				type={type}
				value={value}
				{...objectzod}
				className="peer p-3 block w-full border-gray-200 rounded-lg text-sm border border-zinc-200 placeholder:text-transparent focus:border-purple-d focus:ring-purple-d focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
        focus:pt-6
        focus:pb-2
        [&:not(:placeholder-shown)]:pt-6
        [&:not(:placeholder-shown)]:pb-2
        autofill:pt-3
        autofill:pb-2"
				id="FormInput"
				placeholder={placeholder}
			/>
			<label
				className="absolute top-0 start-0 p-3 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
        peer-focus:text-xs
        peer-focus:-translate-y-1.5
        peer-focus:text-gray-500
        peer-[:not(:placeholder-shown)]:text-xs
        peer-[:not(:placeholder-shown)]:-translate-y-1.5
        peer-[:not(:placeholder-shown)]:text-gray-500"
				htmlFor="FormInput"
			>
				{label}
			</label>
		</div>
	);
}
