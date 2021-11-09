import { withRouting } from "@/lib/routing";
import { userResponseSelect } from "@/lib/schemas/user";
import { NextApiRequest, NextApiResponse } from "next";
import db from "prisma/client";
import * as yup from "yup";

export default withRouting({ GET: handleGET });

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
		select: userResponseSelect,
	});

	res.status(200).json(user);
}
