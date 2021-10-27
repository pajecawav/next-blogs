import { User } from ".prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";

export type NextIronRequest = NextApiRequest & { session: Session };

export type NextIronApiHandler<T = any> = (
	req: NextIronRequest,
	res: NextApiResponse<T>
) => void | Promise<void>;

export type SessionUser = Pick<User, "id" | "username">;

export const SESSION_USER = "user";

export function withSession(handler: NextIronApiHandler): NextApiHandler {
	return withIronSession(handler, {
		password: process.env.SECRET_COOKIE_PASSWORD!,
		cookieName: "session",
		cookieOptions: {
			secure: process.env.NODE_ENV === "production",
		},
	});
}
