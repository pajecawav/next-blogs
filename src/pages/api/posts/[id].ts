import { withRouting } from "@/lib/routing";
import { userResponseSchema } from "@/lib/schemas/user";
import { AuthorizedRequest, withUser } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import db from "prisma/client";
import * as yup from "yup";

export default withRouting({
	GET: handleGET,
	DELETE: withUser(handleDELETE),
});

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
	let id;
	try {
		id = await yup.number().required().validate(req.query.id);
	} catch (e) {
		console.log(e);
		return res
			.status(400)
			.json({ errors: (e as yup.ValidationError).errors });
	}

	const post = await db.post.findUnique({
		where: { id },
		include: { author: true },
	});

	if (!post) {
		return res
			.status(404)
			.json({ error: "Post with this id doesn't exist" });
	}

	res.status(200).json({
		...post,
		author: userResponseSchema.cast(post.author, { stripUnknown: true }),
	});
}

async function handleDELETE(req: AuthorizedRequest, res: NextApiResponse) {
	let id;
	try {
		id = await yup.number().required().validate(req.query.id);
	} catch (e) {
		console.log(e);
		return res
			.status(400)
			.json({ errors: (e as yup.ValidationError).errors });
	}

	const existingPost = await db.post.findUnique({
		where: { id },
	});

	if (!existingPost) {
		return res
			.status(404)
			.json({ error: "Post with this id doesn't exist" });
	} else if (existingPost.authorId !== req.user.id) {
		return res
			.status(403)
			.json({ error: "Not authorized to delete this post" });
	}

	await db.post.delete({
		where: { id },
	});

	res.status(200).end();
}
