import { userResponseSchema } from "@/lib/schemas/user";
import { AuthorizedRequest, withUser } from "@/lib/session";
import { NextApiResponse } from "next";

export default withUser(
	async (req: AuthorizedRequest, res: NextApiResponse) => {
		res.json(userResponseSchema.cast(req.user));
	}
);
