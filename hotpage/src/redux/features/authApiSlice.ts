import { apiSlice } from "../services/apiSlice";

interface User {
	first_name: string;
	last_name: string;
	register_number: string;
	password: string;
}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveUser: builder.query<User, void>({
			query: () => "/auth/users/me/",
		}),
		login: builder.mutation({
			query: ({ register_number, password }) => ({
				url: "/auth/jwt/create",
				method: "POST",
				body: { register_number, password },
			}),
		}),
		verify: builder.mutation({
			query: () => ({
				url: "/auth/jwt/verify",
				method: "POST",
			}),
		}),
		register: builder.mutation({
			query: ({ first_name, last_name, register_number, password }) => ({
				url: "/auth/users/",
				method: "POST",
				body: { first_name, last_name, register_number, password },
			}),
		}),
		registerCNP: builder.mutation({
			query: ({ customer, name, social_name, cpf, rg, birthdate }) => ({
				url: "/customersnp/",
				method: "POST",
				body: { customer, name, social_name, cpf, rg, birthdate },
			}),
		}),
		registerCLP: builder.mutation({
			query: ({
				customer,
				fantasy_name,
				cnpj,
				sr,
				mr,
				establishment_date,
			}) => ({
				url: "/customerslp/",
				method: "POST",
				body: { customer, fantasy_name, cnpj, sr, mr, establishment_date },
			}),
		}),
	}),
});

export const {
	useRetrieveUserQuery,
	useLoginMutation,
	useRegisterMutation,
	useVerifyMutation,
} = authApiSlice;
