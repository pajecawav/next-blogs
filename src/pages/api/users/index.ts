import { withRouting } from "@/lib/routing";
import { userResponseSelect } from "@/lib/schemas/user";
import { NextIronRequest, withSession } from "@/lib/session";
import { NextApiResponse } from "next";
import db from "prisma/client";
import * as yup from "yup";

export default withRouting({ GET: withSession(handleGET) });

const getUsersQuerySchema = yup.object({
	take: yup.number().positive().max(50).default(25),
	skip: yup.number().positive(),
});

async function handleGET(req: NextIronRequest, res: NextApiResponse) {
	let query;
	try {
		query = await getUsersQuerySchema.validate(req.query);
	} catch (e) {
		return res
			.status(400)
			.json({ errors: (e as yup.ValidationError).errors });
	}
	const { take, skip } = query;

	const users = await db.user.findMany({
		take,
		skip,
		select: userResponseSelect,
	});

	res.status(200).json(users);
}
