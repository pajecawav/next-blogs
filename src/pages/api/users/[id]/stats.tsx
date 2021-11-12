import { withRouting } from "@/lib/routing";
import { NextApiRequest, NextApiResponse } from "next";
import db from "prisma/client";
import * as yup from "yup";

export default withRouting({
	GET: handleGET,
});

const paramsSchema = yup.object({ id: yup.number().required() });

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
	let query;
	try {
		query = await paramsSchema.validate(req.query);
	} catch (e) {
		return res
			.status(400)
			.json({ errors: (e as yup.ValidationError).errors });
	}
	const { id } = query;

	const user = await db.user.findFirst({
		where: { id },
	});
	if (!user) {
		return res
			.status(404)
			.json({ error: "User with this id doesn't exist" });
	}

	const stats = await db.post.aggregate({
		where: { authorId: id, draft: false },
		_sum: { rating: true },
		_count: true,
	});

	res.status(200).json({
		rating: stats._sum.rating,
		posts: stats._count,
	});
}
