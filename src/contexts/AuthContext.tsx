import { UserResponse } from "@/lib/schemas/user";
import axios, { AxiosError } from "axios";
import React, { createContext, PropsWithChildren } from "react";
import { useQuery } from "react-query";

type AuthContextValue = {
	user?: UserResponse | null;
	isLoggedIn: boolean;

	isLoading: boolean;
	isError: boolean;
};

export const AuthContext = createContext<AuthContextValue>(
	{} as AuthContextValue
);

type AuthProviderProps = PropsWithChildren<{}>;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const {
		data: user,
		isLoading,
		isError,
	} = useQuery<UserResponse | null, AxiosError, UserResponse | null>(
		"me",
		async () => {
			return axios
				.get<UserResponse>("/api/me")
				.then(response => response.data)
				.catch(() => null);
		}
	);

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoggedIn: !isLoading && !isError && !!user,

				isLoading,
				isError: !isLoading && isError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
