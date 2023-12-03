import Image from "next/image";
import React, { ChangeEvent, FormEvent } from "react";
import ButtonPW from "../ButtonPW";
import Link from "next/link";
import Spinner from "../Spinner";

interface FormsI {
	isRegister?: boolean;
	isCustomerNP?: boolean;
	children: React.ReactNode;
	isLoading: boolean;
	btnText: string;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function ModalPage({
	isRegister,
	isCustomerNP,
	children,
	isLoading,
	btnText,
	onSubmit,
}: FormsI) {
	return (
		<div className="h-full gradient-form bg-neutral-200 dark:bg-neutral-700">
			<div className="h-full p-14">
				<div className="flex flex-wrap items-center justify-center h-full g-6 text-neutral-800 dark:text-neutral-200">
					<div className="w-full">
						<div className="bg-white rounded-lg shadow-lg dark:bg-neutral-800">
							<div className="g-0 lg:flex lg:flex-wrap">
								<div className="w-full px-4 md:px-0">
									<div className="md:mx-6 md:p-12">
										<div className="text-center">
											<Image
												className="w-48 mx-auto"
												src="/content/pandora-logofull.png"
												width={500}
												height={500}
												alt="logo"
											/>
										</div>

										<form className="mt-2" onSubmit={onSubmit}>
											<p className="mb-4">
												{isRegister
													? "Please register for an account"
													: "Please login to your account"}
											</p>

											<div className="grid grid-cols-2 gap-5">{children}</div>

											<div className="flex flex-col flex-wrap w-56 gap-3 pt-1 pb-1 mx-auto mt-5 mb-12 text-center md:w-72">
												<button
													type="submit"
													disabled={isLoading}
													className="flexCenter gap-3 text-white bg-[#530082] py-2 px-6 rounded-lg cursor-pointer group relative overflow-hidden xl:py-3 xl:px-7 xl:scale-125"
												>
													<div className="absolute inset-0 w-0 bg-dough transition-all duration-[250ms] ease-out group-hover:w-full"></div>
													<div className="relative font-bold text-white group-hover:text-[#530082]">
														{isLoading ? <Spinner sm /> : `${btnText}`}
													</div>
												</button>
												{/* <ButtonPW
													text={isLoading ? <Spinner sm /> : `${btnText}`}
													href={
														isCustomerNP
															? "/test/login/customernp"
															: "/test/login/customerlp"
													}
												/> */}
												{isRegister ? null : <a href="#!">Forgot password?</a>}
											</div>

											<div className="flex items-center justify-between pb-6">
												<p className="mb-0 mr-2">
													{isRegister
														? "Already have an account?"
														: "Don't have an account?"}
												</p>
												<Link
													href={
														isRegister
															? isCustomerNP
																? "/test/login/customernp"
																: "/test/login/customerlp"
															: isCustomerNP
															? "/test/register/customernp"
															: "/test/register/customerlp"
													}
												>
													<button
														type="button"
														className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
														data-te-ripple-init
														data-te-ripple-color="light"
													>
														{isRegister ? "Log In" : "Register"}
													</button>
												</Link>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
