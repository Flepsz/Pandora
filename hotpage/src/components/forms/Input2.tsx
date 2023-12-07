import { ChangeEvent } from "react";
import Link from "next/link";

// Interface defining the props expected by the Input2 component
interface Props {
  labelId: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  children: React.ReactNode;
  link?: {
    linkText: string;
    linkUrl: string;
  };
  required?: boolean;
}

// Input2 component definition
export default function Input2({
  labelId,
  type,
  onChange,
  value,
  children,
  link,
  required = false,
}: Props) {
  // Rendering the input field with an optional link
  return (
    <div>
      <div className="flex justify-between align-center">
        {/* Label for the input field */}
        <label
          htmlFor={labelId}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {children}
        </label>
        {/* Optional link */}
        {link && (
          <div className="text-sm">
            <Link
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              href={link.linkUrl}
            >
              {link.linkText}
            </Link>
          </div>
        )}
      </div>
      {/* Input field */}
      <div className="mt-2">
        <input
          id={labelId}
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-purple-100 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-purple-d focus:ring-purple-d focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          name={labelId}
          type={type}
          onChange={onChange}
          value={value}
          required={required}
        />
      </div>
    </div>
  );
}
