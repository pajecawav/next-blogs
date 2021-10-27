import { signupSchema } from "@/lib/schemas/auth";
import { userResponseSelect } from "@/lib/schemas/user";
import { getPasswordHash } from "@/lib/security";
import {
	NextIronRequest,
	SessionUser,
	SESSION_USER,
	withSession,
} from "@/lib/session";
import { NextApiResponse } from "next";
import db from "prisma/client";
import * as yup from "yup";

export default withSession(
	async (req: NextIronRequest, res: NextApiResponse) => {
		if (req.method === "POST") {
			await handlePOST(req, res);
		} else {
			res.status(400).send(`Unsupported method ${req.method}`);
		}
	}
);

async function handlePOST(req: NextIronRequest, res: NextApiResponse) {
	let data;
	try {
		data = await signupSchema.validate(req.body);
	} catch (e) {
		return res
			.status(400)
			.json({ errors: (e as yup.ValidationError).errors });
	}
	const { username, password, ...optionalData } = data;

	const existingUser = await db.user.findFirst({
		where: { username: { equals: username, mode: "insensitive" } },
	});
	if (existingUser) {
		return res.status(400).json({ error: "User already exists" });
	}

	const passwordHash = await getPasswordHash(password);
	const user = await db.user.create({
		data: { username, passwordHash, ...optionalData },
		select: userResponseSelect,
	});

	req.session.set<SessionUser>(SESSION_USER, {
		id: user.id,
		username: user.username,
	});
	await req.session.save();

	res.status(200).json(user);
}
