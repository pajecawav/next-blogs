import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function withRouting(
	handlers: Record<string, NextApiHandler>
): NextApiHandler {
	return function (req: NextApiRequest, res: NextApiResponse) {
		if (!req.method || !(req.method in handlers)) {
			return res.status(400).send(`Unsupported method ${req.method}`);
		} else {
			const handler = handlers[req.method.toUpperCase()];
			return handler(req, res);
		}
	};
}
