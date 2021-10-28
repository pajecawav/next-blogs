import { PostsList } from "@/components/PostsList";
import { SectionTitle } from "@/components/SectionTitle";
import { formatDate } from "@/lib/dates";
import { UserResponse, userResponseSelect } from "@/lib/schemas/user";
import { GetServerSideProps } from "next";
import db from "prisma/client";
import React from "react";
import * as yup from "yup";

type Props = {
	user: UserResponse;
};

const UserPage: React.FC<Props> = ({ user }) => {
	return (
		<div>
			<div className="mb-10">
				<h1 className="text-4xl mb-3">{user.username}</h1>
				<div className="text-gray-500">
					Joined at {formatDate(user.createdAt)}
				</div>
			</div>
			<div>
				<SectionTitle>Posts</SectionTitle>
				<PostsList query={{ authorId: user.id }} showAuthor={false} />
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
