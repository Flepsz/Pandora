export interface Config {
	label: string;
	value: string | undefined;
}

interface Props {
	config: Config[];
}

export default function ListAccount({ config }: Props) {
	return (
		<section className="flex flex-row gap-4">
			{config.map(({ label, value }) => (
				<div className="flex justify-between p-5">
          <h1>{label}:</h1>
          <p>{value}</p>
        </div>
			))}
		</section>
	);
}
