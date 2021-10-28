import { User } from ".prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";
import { getCurrentUser } from "./api/utils";

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

export type AuthorizedRequest = NextIronRequest & {
	user: User;
};

export type AuthorizedApiHandler<T = any> = (
	req: AuthorizedRequest,
	res: NextApiResponse<T>
) => void | Promise<void>;

export const withUser = (handler: AuthorizedApiHandler): NextApiHandler => {
	const withUserImpl = async (req: NextIronRequest, res: NextApiResponse) => {
		const user = await getCurrentUser(req);

		if (!user) {
			return res.status(401).json({ error: "Not authenticated" });
		}

		const authorizedReq = { ...req, user } as AuthorizedRequest;

		return handler(authorizedReq, res);
	};

	return withSession(withUserImpl);
};
