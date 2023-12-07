// Importing the RequireAuth component from a specific path
import RequireAuth from "@/components/utils/RequireAuth";

// Defining the Props interface for the Layout component
interface Props {
  children: React.ReactNode; // Children prop to hold React elements
}

// Defining the Layout component that wraps its children with RequireAuth
export default function Layout({ children }: Props) {
  return <RequireAuth>{children}</RequireAuth>;
}
