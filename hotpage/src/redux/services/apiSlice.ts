import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setOnlyAuth, logout } from "../features/authSlice";
import { Mutex } from "async-mutex";
import { RootState } from "../store";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl: `http://10.109.71.9:8080/api/v1`,
	credentials: "include",
	prepareHeaders: (headers, { getState, endpoint }) => {
		const user = (getState() as RootState).auth.token;

		if (user && user.access) {
			headers.set('Authorization', `Bearer ${user.access}`);
		}
		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{
						url: "/auth/jwt/refresh/",
						method: "POST",
					},
					api,
					extraOptions
				);
				if (refreshResult.data) {
					api.dispatch(setOnlyAuth());

					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
});
