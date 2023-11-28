import { apiSlice } from "../services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveUser: builder.query({
			query: ({
				first_name,
				last_name,
				email,
				password,
			}) => ({
				url: '/users/',
				method: 'POST',
				body: { first_name, last_name, email, password },
			}),
		}),
	}),
});

export const { useRetrieveUserQuery } = authApiSlice;
