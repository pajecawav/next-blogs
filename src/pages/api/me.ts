import { userResponseSelect } from "@/lib/schemas/user";
import { NextIronRequest, SessionUser, withSession } from "@/lib/session";
import { NextApiResponse } from "next";
import db from "prisma/client";

export default withSession(
	async (req: NextIronRequest, res: NextApiResponse) => {
		const sessionUser = req.session.get<SessionUser>("user");

		if (!sessionUser) {
			return res.status(401).json({ error: "Not authenticated" });
		}

		const user = await db.user.findUnique({
			where: { id: sessionUser.id },
			select: userResponseSelect,
		});

		res.json(user);
	}
);
