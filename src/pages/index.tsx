import { LoadingPlaceholder } from "@/components/LoadingPlaceholder";
import { PostsList } from "@/components/PostsList";
import { SectionTitle } from "@/components/SectionTitle";
import { PostWithUserResponse as PostWithAuthorOutSchema } from "@/lib/schemas/post";
import axios from "axios";
import { NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";

const Home: NextPage = () => {
	// TODO: 'load more' button
	const { data: posts, isLoading } = useQuery(
		"posts",
		() => {
			return axios
				.get<PostWithAuthorOutSchema[]>("/api/posts")
				.then(response => response.data);
		},
		{ staleTime: 5 * 60 * 1000 }
	);

	return (
		<main className="mb-10">
			<div>
				<SectionTitle>Latest</SectionTitle>
				{isLoading ? (
					<LoadingPlaceholder className="w-8 my-4 mx-auto" />
				) : (
					posts && <PostsList posts={posts} />
				)}
			</div>
		</main>
	);
};

export default Home;
