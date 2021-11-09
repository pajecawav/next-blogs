import { withRouting } from "@/lib/routing";
import { NextIronRequest, SESSION_USER, withSession } from "@/lib/session";
import { NextApiResponse } from "next";

export default withRouting({ POST: withSession(handlePOST) });

async function handlePOST(req: NextIronRequest, res: NextApiResponse) {
	req.session.unset(SESSION_USER);
	await req.session.save();
	res.status(200).json({ message: "Successfully logged out" });
}
