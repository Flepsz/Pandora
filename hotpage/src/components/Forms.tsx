import Image from "next/image";
import React, { useCallback, useState } from "react";
import ButtonPW from "./ButtonPW";
import Link from "next/link";
import Input from "./Input";
import axios from "axios"

interface FormsI {
	isRegister?: boolean;
	isCustomerNP?: boolean;
}

export const axiosInstance = axios.create({
	baseURL: "http://127.0.0.1:8056/api/v1/",
});

export default function Forms({ isRegister, isCustomerNP }: FormsI) {
	const [registerNumber, setRegisterNumber] = useState("");
	const [password, setPassword] = useState("");

	const [name, setName] = useState("");
	const [socialName, setSocialName] = useState("");
	const [rg, setRg] = useState("");
	const [birthdate, setBirthdate] = useState("");

	const [fantasyName, setFantasyName] = useState("");
	const [stateRegistration, setStateRegistration] = useState("");
	const [municipalRegistration, setMunicipalRegistration] = useState("");
	const [establishmentDate, setEstablishmentDate] = useState("");

	const registerAccount = useCallback(async () => {
		try {
			const createUser = await axiosInstance.post("auth/users/", {
				register_number: registerNumber,
				picture: "777",
				password: password,
			});
			console.log(createUser);
			if (createUser.status === 201) {
				const jwtToken = await axiosInstance.post("auth/jwt/create/", {
					register_number: registerNumber,
					password: password,
				});
				console.log(jwtToken.data.access);
				if (isCustomerNP) {
					const createNP = await axiosInstance.post("customersnp/", {
						customer: registerNumber,
						name: name,
						social_name: socialName,
						cpf: registerNumber,
						rg: rg,
						birthdate: birthdate
					},
						{
							headers: {
								Authorization: `Bearer ${jwtToken.data.access}`,
							},
						});
					console.log(createNP);
				} else {
					const createLP = await axiosInstance.post("customerslp/", {
						customer: registerNumber,
						fantasy_name: fantasyName,
						cnpj: registerNumber,
						sr: stateRegistration,
						mr: municipalRegistration,
						establishment_date: establishmentDate
					},
						{
							headers: {
								Authorization: `Bearer ${jwtToken.data.access}`,
							},
						});
					console.log(createLP);
					
				}
			}
		} catch (error) {
			console.log(error);
		}
	}, [registerNumber, password, isCustomerNP, name, socialName, rg, birthdate, fantasyName, stateRegistration, municipalRegistration, establishmentDate])

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

											<div className="grid grid-cols-2 gap-5">
												<Input
													placeholder={isCustomerNP ? "CPF" : "CNPJ"}
													label={isCustomerNP ? "CPF" : "CNPJ"}
													onChange={isCustomerNP ? setRegisterNumber : setRegisterNumber}
													value={isCustomerNP ? registerNumber : registerNumber}
												/>

												<Input
													placeholder="Password"
													label="Password"
													type="password"
													onChange={setPassword}
													value={password}
												/>
												{isRegister &&
													(isCustomerNP ? (
														<>
															<Input
																placeholder="Name"
																label="Name"
																onChange={setName}
																value={name}
															/>
															<Input
																placeholder="Social Name"
																label="Social Name"
																onChange={setSocialName}
																value={socialName}
															/>
															<Input
																placeholder="RG"
																label="RG"
																onChange={setRg}
																value={rg}
															/>
															<Input
																placeholder="Birthdate"
																label="Birthdate"
																type="date"
																onChange={setBirthdate}
																value={birthdate}
															/>
														</>
													) : (
														<>
															<Input
																placeholder="Fantasy Name"
																label="Fantasy Name"
																type="text"
																onChange={setFantasyName}
																value={fantasyName}
															/>
															<Input
																placeholder="State Registration"
																label="State Registration"
																type="text"
																onChange={setStateRegistration}
																value={stateRegistration}
															/>
															<Input
																placeholder="Municipal Registration"
																label="Municipal Registration"
																type="text"
																onChange={setMunicipalRegistration}
																value={municipalRegistration}
															/>
															<Input
																placeholder="Establishment Date"
																label="Establishment Date"
																type="date"
																onChange={setEstablishmentDate}
																value={establishmentDate}
															/>
														</>
													))}
											</div>

											<div className="flex flex-col flex-wrap w-56 gap-3 pt-1 pb-1 mx-auto mt-5 mb-12 text-center md:w-72">
												<ButtonPW
													text={isRegister ? "Register" : "Log In"}
													href={isCustomerNP ? "/login/customernp" : "/login/customerlp"}
												/>
												{isRegister ? null : <a href="#!">Forgot password?</a>}
											</div>

											<div className="flex items-center justify-between pb-6">
												<p className="mb-0 mr-2">
													{isRegister
														? "Already have an account?"
														: "Don't have an account?"}
												</p>
												<Link onClick={registerAccount} href={isRegister ? (isCustomerNP ? "/login/customernp" : "/login/customerlp") : (isCustomerNP ? "/register/customernp" : "/register/customerlp")}>
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
