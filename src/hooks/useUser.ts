import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function useUser() {
	const user = useContext(AuthContext);
	return user;
}
