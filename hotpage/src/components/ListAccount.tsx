// Interface defining the structure of an account configuration
export interface Config {
  number: string;
  agency: string | undefined;
  acc_type: string;
  balance: string;
  limit: string;
}

// ListAccount component definition, rendering an account based on the provided configuration
export default function ListAccount({ number, agency, acc_type, balance, limit }: Config) {
  return (
    <section className="flex flex-col gap-4 px-10 py-20 border rounded-lg border-purple-d">
      <div className="flex justify-between gap-5">
        <div key={number} className="flex flex-col justify-between">
          <p>Number: {number}</p>
          <p>Agency: {agency}</p>
        </div>
        <div>
          <p>Type: {acc_type}</p>
        </div>
      </div>
      <div>
        <p>Balance: USD {balance}</p>
        <p>Limit: {limit}</p>
      </div>
    </section>
  );
}
