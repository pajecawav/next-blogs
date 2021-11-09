import { withRouting } from "@/lib/routing";
import { loginSchema } from "@/lib/schemas/auth";
import { userResponseSchema } from "@/lib/schemas/user";
import { validatePassword } from "@/lib/security";
import {
	NextIronRequest,
	SessionUser,
	SESSION_USER,
	withSession,
} from "@/lib/session";
import { NextApiResponse } from "next";
import db from "prisma/client";
import * as yup from "yup";

export default withRouting({ POST: withSession(handlePOST) });

async function handlePOST(req: NextIronRequest, res: NextApiResponse) {
	let data;
	try {
		data = await loginSchema.validate(req.body);
	} catch (e) {
		return res
			.status(400)
			.json({ errors: (e as yup.ValidationError).errors });
	}

	const user = await db.user.findUnique({
		where: { username: data.username },
	});

	if (!user) {
		return res.status(400).json({ error: "User doesn't exist" });
	}

	if (await validatePassword(data.password, user.passwordHash)) {
		req.session.set<SessionUser>(SESSION_USER, {
			id: user.id,
			username: user.username,
		});
		await req.session.save();

		res.json(userResponseSchema.cast(user, { stripUnknown: true }));
	} else {
		res.status(400).json({ error: "Invalid credentials" });
	}
}
