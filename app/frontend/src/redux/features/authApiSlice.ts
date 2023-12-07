import { apiSlice } from "../services/apiSlice";
import {
  AccInvs,
  Account,
  Accounts,
  Addresses,
  Cards,
  Contacts,
  CustomersLP,
  CustomersNP,
  Managers,
  User,
} from "./types";

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
    retrieveCNP: builder.query<CustomersNP, void>({
      query: () => "/customersnp/",
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
    retrieveCLP: builder.query<CustomersLP, void>({
      query: () => "/customerslp/",
    }),
    registerAccount: builder.query({
      query: ({ customer, acc_type }) => ({
        url: "/accounts/",
        method: "POST",
        body: { customer, acc_type },
      }),
    }),
    retrieveAccounts: builder.query<Accounts, void>({
      query: () => "/accounts/",
    }),
    retrieveOneAccount: builder.query<Account, { account?: string }>({
      query: (options) => {
        const { account, ...restOptions } = options;
        const url = `/accounts/${account ? `${account}` : ""}`;
        return url;
      },
    }),
    registerAddress: builder.mutation({
      query: ({ customer, street, neighborhood, city, state, zip_code }) => ({
        url: "/addresses/",
        method: "POST",
        body: { customer, street, neighborhood, city, state, zip_code },
      }),
    }),
    retrieveAddresses: builder.query<Addresses, void>({
      query: () => "/addresses/",
    }),
    registerCard: builder.mutation({
      query: ({ account }) => ({
        url: "/cards/",
        method: "POST",
        body: { account },
      }),
    }),
    retrieveCards: builder.query<Cards, { account?: string }>({
      query: (options) => {
        const { account, ...restOptions } = options;
        const url = `/cards/${account ? `?account=${account}` : ""}`;
        return url;
      },
    }),
    registerContact: builder.mutation({
      query: ({ customer, number, email, observation }) => ({
        url: "/contacts/",
        method: "POST",
        body: { customer, number, email, observation },
      }),
    }),
    retrieveContacts: builder.query<Contacts, void>({
      query: () => "/cards/",
    }),
    retrieveManager: builder.query<Managers, { account?: string }>({
      query: (options) => {
        const { account, ...restOptions } = options;
        const url = `/manager/${account ? `?account=${account}` : ""}`;
        return url;
      },
    }),
    registerTransaction: builder.mutation({
      query: ({ card, amount, operation, receiver }) => ({
        url: "/transactions/",
        method: "POST",
        body: { card, amount, operation, receiver },
      }),
    }),
    registerPix: builder.mutation({
      query: ({ account, amount, receiver }) => ({
        url: "/transactions/",
        method: "POST",
        body: { account, amount, receiver },
      }),
    }),
    retrieveAccountInvestment: builder.query<AccInvs, void>({
      query: () => "/account-investments/",
    }),
    registerAccountInvestment: builder.mutation({
      query: ({ id_account, id_investment }) => ({
        url: "/account-investments/",
        method: "POST",
        body: { id_account, id_investment },
      }),
    }),
    retrieveLoans: builder.query<Loans, void>({
      query: () => "/loans/",
    }),
    registerLoans: builder.mutation({
      query: ({ account, requested_amount, installment_number, observation }) => ({
        url: "/loans/",
        method: "POST",
        body: { account, requested_amount, installment_number, observation },
      }),
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
  useRegisterAccountQuery,
  useRegisterAddressMutation,
  useRegisterCardMutation,
  useRegisterContactMutation,
  useRegisterTransactionMutation,
  useRegisterPixMutation,
  useRetrieveAddressesQuery,
  useRetrieveCardsQuery,
  useRetrieveOneAccountQuery,
  useRetrieveContactsQuery,
  useRetrieveManagerQuery
} = authApiSlice;
