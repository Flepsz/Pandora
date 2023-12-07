import { apiSlice } from "../services/apiSlice";

interface User {
  first_name: string;
  last_name: string;
  register_number: string;
  password: string;
}

interface Account {
  number: string;
  created: Date;
  modified: Date;
  agency: string;
  acc_type: string;
  balance: string;
  limit: string;
  active: boolean;
  customer: number[];
}

interface Accounts {
  accounts: Account[];
}

interface CustomerNP {
  id: number;
  created: Date;
  modified: Date;
  active: boolean;
  name: string;
  social_name: string;
  cpf: string;
  rg: string;
  birthdate: Date;
  customer: number;
}

interface CustomerLP {
  id: number;
  created: Date;
  modified: Date;
  active: boolean;
  fantasy_name: string;
  cnpj: string;
  establishment_date: Date;
  sr: string;
  mr: string;
  customer: number;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => "/auth/users/me/",
    }),
    login: builder.mutation({
      query: ({ register_number, password }) => ({
        url: "/auth/jwt/create/",
        method: "POST",
        body: { register_number, password },
      }),
    }),
    verify: builder.mutation({
      query: ({ token }) => ({
        url: "/auth/jwt/verify/",
        method: "POST",
        body: { token },
      }),
    }),
    register: builder.mutation({
      query: ({ register_number, password }) => ({
        url: "/auth/users/",
        method: "POST",
        body: { register_number, password },
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
    retrieveAccounts: builder.query<Accounts, void>({
      query: () => "/accounts/",
    }),
    retrieveCNP: builder.query<CustomerNP, void>({
      query: () => "/customersnp/",
    }),
    retrieveCLP: builder.query<CustomerLP, void>({
      query: () => "/customerslp/",
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useRetrieveCLPQuery,
  useRetrieveCNPQuery,
  useRetrieveAccountsQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useRegisterCLPMutation,
  useRegisterCNPMutation,
} = authApiSlice;
