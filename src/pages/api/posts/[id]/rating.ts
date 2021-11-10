import { withRouting } from "@/lib/routing";
import { ratePostSchema } from "@/lib/schemas/post";
import { AuthorizedRequest, withUser } from "@/lib/session";
import { NextApiResponse } from "next";
import db from "prisma/client";
import * as yup from "yup";

export default withRouting({
	POST: withUser(handlePOST),
});

async function handlePOST(req: AuthorizedRequest, res: NextApiResponse) {
	let id;
	let data;
	try {
		id = await yup.number().required().validate(req.query.id);
		data = await ratePostSchema.validate(req.body);
	} catch (e) {
		console.log(e);
		return res
			.status(400)
			.json({ errors: (e as yup.ValidationError).errors });
	}

	const post = await db.post.findUnique({
		where: { id },
	});

	if (!post) {
		return res
			.status(404)
			.json({ error: "Post with this id doesn't exist" });
	}

	const existingRating = await db.rating.findUnique({
		where: { postId_userId: { postId: id, userId: req.user.id } },
	});

	if (existingRating?.rating === data.rating) {
		return res.status(200).end();
	}

	const incrementAmount = data.rating * (existingRating ? 2 : 1);

	await db.$transaction([
		db.rating.upsert({
			where: { postId_userId: { postId: id, userId: req.user.id } },
			create: { rating: data.rating, postId: id, userId: req.user.id },
			update: { rating: data.rating },
		}),
		db.post.update({
			where: { id },
			data: { rating: { increment: incrementAmount } },
		}),
	]);

	res.status(200).end();
}
