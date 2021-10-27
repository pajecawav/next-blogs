import { UserResponse } from "@/lib/schemas/user";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useLogin = () => {
	const queryClient = useQueryClient();

	const {
		mutate: login,
		error,
		isError,
	} = useMutation<
		unknown,
		Error,
		{
			username: string;
			password: string;
		}
	>(
		({ username, password }) => {
			return axios
				.post<UserResponse>("/api/auth/login", {
					username,
					password,
				})
				.then(response => response.data)
				.catch(e => {
					throw new Error((e as AxiosError).response?.data.error);
				});
		},
		{
			onSuccess: user => {
				queryClient.setQueryData("me", user);
			},
		}
	);

	return { login, error, isError };
};
