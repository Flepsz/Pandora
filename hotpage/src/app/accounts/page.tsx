"use client";

import ListAccount, { Config } from "@/components/ListAccount";
import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner";
import { useRetrieveAccountsQuery } from "@/redux/features/authApiSlice";

export default function AccountsPage() {
  const { data: accounts, isLoading, isFetching } = useRetrieveAccountsQuery();

  console.log(accounts);

  const config = (accounts?.flatMap((account) => [
    {
      number: account.number,
      agency: account.agency,
      acc_type: account.acc_type,
      balance: account.balance,
      limit: account.limit,
    },
  ]) || []) as Config[];

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="w-full h-screen pt-24 flex flex-col gap-5 justify-center items-center">
        {accounts && <h1 className="text-3xl font-bold">My Accounts</h1>}
        <section className="flex gap-5">
          {accounts ? (
            config.map((acc) => (
              <ListAccount
                acc_type={acc.acc_type}
                agency={acc.agency}
                balance={acc.balance}
                limit={acc.limit}
                number={acc.number}
              />
            ))
          ) : (
            <h1 className="text-2xl font-bold">
              You don't have accounts in Pandora, please create one in app
            </h1>
          )}
        </section>
      </main>
    </>
  );
}
