"use client";

import ListAccount, { Config } from "@/components/ListAccount";
import Navbar from "@/components/Navbar";
import { useRetrieveAccountsQuery } from "@/redux/features/authApiSlice";

export default function AccountsPage() {
  const {data: accounts, isLoading, isFetching} = useRetrieveAccountsQuery();

  const config = (accounts?.accounts.flatMap((account) => ([
    {
      label: "Number Account",
      value: account.number
    },
    {
      label: "Agency",
      value: account.agency
    },
  ])) || []) as Config[];

  const config2 = [
		{
      label: "Number Account",
      value: "3443434343"
    },
    {
      label: "Agency",
      value: "4456"
    }
	];
  
  return (
    <>
			<Navbar />
			<main className="w-full pt-24">
				<ListAccount config={config2} />
			</main>
		</>
  )
}
