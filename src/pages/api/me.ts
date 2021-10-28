import { userResponseSchema } from "@/lib/schemas/user";
import { AuthorizedRequest, withUser } from "@/lib/session";
import { NextApiResponse } from "next";

// export default withSession(
// 	async (req: NextIronRequest, res: NextApiResponse) => {
// 		const user = await getCurrentUser(req);

// 		if (!user) {
// 			return res.status(401).json({ error: "Not authenticated" });
// 		}

// 		res.json(userResponseSchema.cast(user));
// 	}
// );

export default withUser(
	async (req: AuthorizedRequest, res: NextApiResponse) => {
		res.json(userResponseSchema.cast(req.user));
	}
);
