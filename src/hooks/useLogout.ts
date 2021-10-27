import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useLogout = () => {
	const queryClient = useQueryClient();

	const { mutate: logout } = useMutation(
		() => {
			return axios.post("/api/auth/logout");
		},
		{
			onSuccess: () => {
				queryClient.setQueryData("me", null);
			},
		}
	);

	return { logout };
};
