import { User } from "@prisma/client";
import db from "prisma/client";
import { NextIronRequest, SessionUser } from "../session";

export const getCurrentUser = async (
	req: NextIronRequest
): Promise<User | null> => {
	const sessionUser = req.session.get<SessionUser>("user");

	if (!sessionUser) {
		return null;
	}

	const user = await db.user.findUnique({
		where: { id: sessionUser.id },
	});

	return user;
};
