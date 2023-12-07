"use client";

import ListAccount, { Config } from "@/components/ListAccount";
import Navbar from "@/components/Navbar"; 
import Spinner from "@/components/Spinner"; 
import { useRetrieveAccountsQuery } from "@/redux/features/authApiSlice";

// Defining the AccountsPage component
export default function AccountsPage() {
  // Using the useRetrieveAccountsQuery hook to fetch account data
  const { data: accounts, isLoading, isFetching } = useRetrieveAccountsQuery();

  // Creating a configuration array from the fetched accounts data
  const config = (accounts?.flatMap((account) => [
    {
      number: account.number,
      agency: account.agency,
      acc_type: account.acc_type,
      balance: account.balance,
      limit: account.limit,
    },
  ]) || []) as Config[];

  // Displaying a spinner while data is loading
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
      <main className="flex flex-col items-center justify-center w-full h-screen gap-5 pt-24">
        {accounts && <h1 className="text-3xl font-bold">My Accounts</h1>} {/* Displaying a heading if accounts exist */}
        <section className="flex gap-5">
          {accounts ? ( // Checking if accounts exist
            config.map((acc) => (
              // Mapping through the config array and rendering ListAccount components
              <ListAccount
                acc_type={acc.acc_type}
                agency={acc.agency}
                balance={acc.balance}
                limit={acc.limit}
                number={acc.number}
              />
            ))
          ) : (
            // Displaying a message if no accounts are found
            <h1 className="text-2xl font-bold">
              You don't have accounts in Pandora, please create one in the app
            </h1>
          )}
        </section>
      </main>
    </>
  );
}
