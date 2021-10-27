import { userResponseSelect } from "@/lib/schemas/user";
import { NextApiRequest, NextApiResponse } from "next";
import db from "prisma/client";
import * as yup from "yup";

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

const getPostsQuerySchema = yup.object({
	take: yup.number().positive().max(50).default(25),
	skip: yup.number().positive(),
});

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
	let query;
	try {
		query = await getPostsQuerySchema.validate(req.query);
	} catch (e) {
		return res
			.status(400)
			.json({ errors: (e as yup.ValidationError).errors });
	}
	const { take, skip } = query;

	const posts = await db.post.findMany({
		take,
		skip,
		orderBy: { createdAt: "asc" },
		include: {
			author: { select: userResponseSelect },
		},
	});

	res.status(200).json(posts);
}
