import { PostWithUserResponse, RatePostSchema } from "@/lib/schemas/post";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import axios, { AxiosError } from "axios";
import classNames from "classnames";
import React, { FC } from "react";
import { useMutation, useQueryClient } from "react-query";

type Props = {
	postId: number;
	rating: number;
	placedRating?: -1 | 1;
};

export const UpvoteButtons: FC<Props> = ({ postId, rating, placedRating }) => {
	const queryClient = useQueryClient();

	const { mutate: placeRating } = useMutation(
		(rating: -1 | 1) =>
			axios
				.post<unknown, unknown, RatePostSchema>(
					`/api/posts/${postId}/rating`,
					{ rating }
				)
				.catch(e => {
					throw new Error((e as AxiosError).response?.data.error);
				}),
		{
			onSuccess: (_, rating) => {
				queryClient.setQueryData<PostWithUserResponse>(
					["post", postId],
					post => {
						const incrementAmount =
							rating * (placedRating === undefined ? 1 : 2);
						return {
							...post!,
							rating: post!.rating + incrementAmount,
							placedRating: rating,
						};
					}
				);
			},
		}
	);

	return (
		<div className="flex flex-col -space-y-1 items-center text-gray-400">
			<button
				className={classNames(placedRating === 1 && "text-green-500")}
				onClick={() => {
					if (placedRating !== 1) {
						placeRating(1);
					}
				}}
			>
				<ChevronUpIcon className="w-6 h-6" />
			</button>
			<div>{rating}</div>
			<button
				className={classNames(placedRating === -1 && "text-green-500")}
				onClick={() => {
					if (placedRating !== -1) {
						placeRating(-1);
					}
				}}
			>
				<ChevronDownIcon className="w-6 h-6" />
			</button>
		</div>
	);
};
