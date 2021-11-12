import { PostsList } from "@/components/PostsList";
import { SectionTitle } from "@/components/SectionTitle";
import { UserStats } from "@/components/UserStats";
import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/lib/dates";
import { UserResponse, userResponseSelect } from "@/lib/schemas/user";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import db from "prisma/client";
import React from "react";
import * as yup from "yup";

type Props = {
	user: UserResponse;
};

const UserPage: NextPage<Props> = ({ user }) => {
	const { user: currentUser } = useUser();

	const isMe = user.id === currentUser?.id;

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="mb-10">
				<h1 className="text-4xl mb-3">{user.username}</h1>
				<div className="text-gray-500">
					Joined at {formatDate(user.createdAt)}
				</div>
				<UserStats id={user.id} />
				{user.bio && <p className="mt-4">{user.bio}</p>}
			</div>
			<div className="flex flex-col gap-4">
				{isMe && (
					<div>
						<SectionTitle>My Drafts</SectionTitle>
						<PostsList
							query={{
								authorId: user.id,
								createdAt: "desc",
								draft: true,
							}}
							showActions={isMe}
							showAuthor={false}
						/>
					</div>
				)}
				<div>
					<div className="flex">
						<SectionTitle>Posts</SectionTitle>
						{isMe && (
							<Link href="/create-post">
								<a className="ml-auto mb-1 self-end text-gray-500 transition-opacity duration-75 hover:opacity-50">
									New Post
								</a>
							</Link>
						)}
					</div>
					<PostsList
						query={{
							authorId: user.id,
							createdAt: "desc",
							draft: false,
						}}
						showActions={isMe}
						showAuthor={false}
					/>
				</div>
			</div>
		</div>
	);
};

const paramsSchema = yup.object({ username: yup.string().required() });

export const getServerSideProps: GetServerSideProps = async context => {
	let params;
	try {
		params = await paramsSchema.validate(context.params);
	} catch (e) {
		return { notFound: true };
	}

	const user = await db.user.findFirst({
		where: { username: { equals: params.username, mode: "insensitive" } },
		select: {
			...userResponseSelect,
		},
	});

	if (!user) {
		return { notFound: true };
	}

	return {
		props: {
			user,
		},
	};
};

export default UserPage;
