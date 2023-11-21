import React from "react";

interface InputPropsI {
  placeholder: string;
  label: string;
  onChange: any;
  value: string;
  type?: string
}

export default function Input({type, placeholder, label, onChange ,value}: InputPropsI) {
	return (
		<div className="relative mb-4" data-te-input-wrapper-init>
			<input
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChange(e.target.value)}}
        type={type}
        value={value}
				className="
        block
        rounded-md
        px-6
        pt-6
        pb-1
        w-full
        text-md
        text-white
        bg-transparent
        appearance-none
        focus:outline-none
        transition
        focus:bg-[#e7e5e577]
        focus:ring-0
        peer"
				id="exampleFormControlInput11"
				placeholder={placeholder}
			/>
			<label
				htmlFor="exampleFormControlInput11"
				className="
        absolute
        text-md
        text-neutral-500
        duration-200
        transform
        -translate-y-3
        scale-75
        top-0
        z-10
        origin-[0]
        left-6
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3
        "
			>
				{label}
			</label>
		</div>
	);
}
