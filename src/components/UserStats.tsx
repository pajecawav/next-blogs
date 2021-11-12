import { UserStats as UserStatsType } from "@/lib/schemas/user";
import { DocumentTextIcon, StarIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useQuery } from "react-query";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

type Props = {
	id: number;
};

export const UserStats = ({ id }: Props) => {
	const { data: stats, isLoading } = useQuery(["user-stats", id], () => {
		return axios
			.get<UserStatsType>(`/api/users/${id}/stats`)
			.then(response => response.data);
	});

	if (isLoading) {
		return <LoadingPlaceholder className="w-5 h-5" />;
	}

	return (
		<div className="flex gap-2">
			<div className="flex gap-1 items-center" title="Rating">
				<StarIcon className="w-4 h-4 inline" />
				<span>{stats?.rating}</span>
			</div>
			<div className="flex gap-1 items-center" title="Posts">
				<DocumentTextIcon className="w-4 h-4 inline" />
				<span>{stats?.posts}</span>
			</div>
		</div>
	);
};
