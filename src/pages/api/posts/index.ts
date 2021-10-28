import { PostsQuery, postsQuerySchema } from "@/lib/schemas/post";
import { userResponseSelect } from "@/lib/schemas/user";
import { NextApiRequest, NextApiResponse } from "next";
import db from "prisma/client";
import { ValidationError } from "yup";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		await handleGET(req, res);
	} else {
		res.status(400).send(`Unsupported method ${req.method}`);
	}
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
	let query: PostsQuery;
	try {
		query = await postsQuerySchema.validate(req.query);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ errors: (e as ValidationError).errors });
	}
	const { authorId, take = 25, skip, createdAt } = query;

	const posts = await db.post.findMany({
		where: {
			authorId,
		},
		take,
		skip,
		orderBy: { createdAt },
		include: {
			author: { select: userResponseSelect },
		},
	});

	res.status(200).json(posts);
}
