import { PostsList } from "@/components/PostsList";
import { SectionTitle } from "@/components/SectionTitle";
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
		<div>
			<div className="mb-10">
				<h1 className="text-4xl mb-3">{user.username}</h1>
				<div className="text-gray-500">
					Joined at {formatDate(user.createdAt)}
				</div>
			</div>
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
					query={{ authorId: user.id, createdAt: "desc" }}
					showAuthor={false}
				/>
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
