import Image from "next/image";
import React from "react";
import ButtonPW from "./ButtonPW";
import Link from "next/link";

interface FormsI {
	isRegister?: boolean;
}

export default function Forms({ isRegister }: FormsI) {
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

										<form className="mt-2">
											<p className="mb-4">
												{isRegister
													? "Please register for an account"
													: "Please login to your account"}
											</p>
											<div className="relative mb-4" data-te-input-wrapper-init>
												<input
													type="text"
													className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
													id="exampleFormControlInput1"
													placeholder={
														isRegister ? "Register Number" : "Username"
													}
												/>
												<label
													htmlFor="exampleFormControlInput1"
													className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
												>
													Register Number
												</label>
											</div>

											<div className="relative mb-4" data-te-input-wrapper-init>
												<input
													type="password"
													className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
													id="exampleFormControlInput11"
													placeholder="Password"
												/>
												<label
													htmlFor="exampleFormControlInput11"
													className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
												>
													Password
												</label>
											</div>

											<div className="flex flex-col flex-wrap w-56 gap-3 pt-1 pb-1 mx-auto mb-12 text-center md:w-72">
												<ButtonPW
													text={isRegister ? "Register" : "Log In"}
													href={isRegister ? "/login" : "/login"}
												/>
												{isRegister ? null : <a href="#!">Forgot password?</a>}
											</div>

											<div className="flex items-center justify-between pb-6">
												<p className="mb-0 mr-2">
													{isRegister
														? "Already have an account?"
														: "Don't have an account?"}
												</p>
												<Link href={isRegister ? "/login" : "/register"}>
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
