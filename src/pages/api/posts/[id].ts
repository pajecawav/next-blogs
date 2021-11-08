import { AuthorizedRequest, withUser } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import db from "prisma/client";
import * as yup from "yup";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "DELETE") {
		await handleDELETE(req, res);
	} else {
		res.status(400).send(`Unsupported method ${req.method}`);
	}
};

const handleDELETE = withUser(
	async (req: AuthorizedRequest, res: NextApiResponse) => {
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
);

export default handler;
