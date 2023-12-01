import RequireAuth from "@/components/utils/RequireAuth";

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return <RequireAuth>{children}</RequireAuth>;
}
