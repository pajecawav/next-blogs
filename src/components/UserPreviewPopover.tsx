import { formatDate } from "@/lib/dates";
import { UserResponse, UserStats } from "@/lib/schemas/user";
import { Transition } from "@headlessui/react";
import { DocumentTextIcon, StarIcon } from "@heroicons/react/solid";
import axios, { AxiosError } from "axios";
import React, { Fragment } from "react";
import { useQuery } from "react-query";

type Props = {
	id: number;
};

export const UserPreviewPopover = ({ id }: Props) => {
	const {
		data: user,
		isLoading: isLoadingUser,
		isError: isErrorUser,
	} = useQuery<UserResponse | null, AxiosError, UserResponse | null>(
		["user", id],
		() => {
			return axios
				.get<UserResponse>(`/api/users/${id}`)
				.then(response => response.data)
				.catch(() => null);
		}
	);

	const {
		data: stats,
		isLoading: isLoadingStats,
		isError: isErrorStats,
	} = useQuery<UserStats | null, AxiosError, UserStats | null>(
		["user-stats", id],
		() => {
			return axios
				.get<UserStats>(`/api/users/${id}/stats`)
				.then(response => response.data)
				.catch(() => null);
		}
	);

	if (
		// TODO: is there a less ugly way to do this?
		!user ||
		isLoadingUser ||
		isErrorUser ||
		!stats ||
		isLoadingStats ||
		isErrorStats
	) {
		return null;
	}

	return (
		<Transition
			as={Fragment}
			enter="transition ease-out duration-200"
			enterFrom="opacity-0 translate-y-0.5"
			leave="transition ease-in duration-100"
			leaveTo="opacity-0 translate-y-0.5"
			appear={true}
			show={true}
		>
			<div className="w-96 absolute right-10 z-10 flex flex-col gap-3 px-4 py-2 bg-white shadow-lg rounded-sm border text-sm">
				<div className="italic">
					Joined on {formatDate(user.createdAt)}
				</div>
				<div>
					<div className="flex gap-1 items-center" title="Rating">
						<StarIcon className="w-4 h-4 inline text-gray-500" />
						<span>{stats.rating} rating</span>
					</div>
					<div className="flex gap-1 items-center" title="Posts">
						<DocumentTextIcon className="w-4 h-4 inline text-gray-500" />
						<span>{stats.posts} posts</span>
					</div>
				</div>
				{user.bio && <div>{user.bio}</div>}
			</div>
		</Transition>
	);
};
