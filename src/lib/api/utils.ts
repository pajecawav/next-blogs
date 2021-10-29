import { User } from "@prisma/client";
import { Session } from "next-iron-session";
import db from "prisma/client";
import { SessionUser } from "../session";

export const getCurrentUser = async (
	session: Session
): Promise<User | null> => {
	const sessionUser = session.get<SessionUser>("user");

	if (!sessionUser) {
		return null;
	}

	const user = await db.user.findUnique({
		where: { id: sessionUser.id },
	});

	return user;
};
