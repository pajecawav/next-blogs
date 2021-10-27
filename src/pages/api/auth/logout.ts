import { NextIronRequest, SESSION_USER, withSession } from "@/lib/session";
import { NextApiResponse } from "next";

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
	req.session.unset(SESSION_USER);
	await req.session.save();
	res.status(200).json({ message: "Successfully logged out" });
}
