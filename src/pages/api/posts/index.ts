import {
	CreatePost,
	createPostSchema,
	PostsQuery,
	postsQuerySchema,
} from "@/lib/schemas/post";
import { userResponseSelect } from "@/lib/schemas/user";
import { AuthorizedRequest, withUser } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import db from "prisma/client";
import { ValidationError } from "yup";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET") {
		await handleGET(req, res);
	} else if (req.method === "POST") {
		await handlePOST(req, res);
	} else {
		res.status(400).send(`Unsupported method ${req.method}`);
	}
};

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
	let query: PostsQuery;
	try {
		query = await postsQuerySchema.validate(req.query);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ errors: (e as ValidationError).errors });
	}
	const { authorId, take = 10, createdAt, cursor } = query;

	const posts = await db.post.findMany({
		where: {
			authorId,
		},
		take,
		...(cursor && {
			skip: 1,
			cursor: { id: cursor },
		}),
		orderBy: { createdAt },
		include: {
			author: { select: userResponseSelect },
		},
	});

	res.status(200).json({
		posts,
		nextCursor: posts.length > 0 ? posts[posts.length - 1].id : undefined,
	});
}

const handlePOST = withUser(
	async (req: AuthorizedRequest, res: NextApiResponse) => {
		let data: CreatePost;
		try {
			data = await createPostSchema.validate(req.body);
		} catch (e) {
			console.log(e);
			return res
				.status(400)
				.json({ errors: (e as ValidationError).errors });
		}

		const post = await db.post.create({
			data: { ...data, authorId: req.user.id },
		});

		res.status(200).json(post);
	}
);

export default handler;
