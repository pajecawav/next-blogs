import { withRouting } from "@/lib/routing";
import { editUserSchema, userResponseSelect } from "@/lib/schemas/user";
import {
	AuthorizedApiHandler,
	AuthorizedRequest,
	withUser,
} from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import db from "prisma/client";
import * as yup from "yup";

export default withRouting({
	GET: handleGET,
	PATCH: withUser(handlePATCH),
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
		select: userResponseSelect,
	});

	if (!user) {
		return res
			.status(404)
			.json({ error: "User with this id doesn't exist" });
	}

	res.status(200).json(user);
}

const patchParamsSchema = yup.object({ id: yup.number().required() });

async function handlePATCH(req: AuthorizedRequest, res: NextApiResponse) {
	let query;
	let data;
	try {
		query = await patchParamsSchema.validate(req.query);
		data = await editUserSchema.validate(req.body);
	} catch (e) {
		return res
			.status(400)
			.json({ errors: (e as yup.ValidationError).errors });
	}
	const { id } = query;

	if (id !== req.user.id) {
		return res
			.status(403)
			.json({ error: "Can only update your personal profile" });
	}

	await db.user.update({
		where: { id },
		data,
	});

	res.status(200).end();
}
