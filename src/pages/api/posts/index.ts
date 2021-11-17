import { countWords } from "@/lib/post";
import { withRouting } from "@/lib/routing";
import {
	CreatePost,
	createPostSchema,
	PostsQuery,
	postsQuerySchema,
	UpdatePost,
	updatePostSchema,
} from "@/lib/schemas/post";
import { userResponseSelect } from "@/lib/schemas/user";
import {
	AuthorizedRequest,
	OptionallyAuthorizedRequest,
	withOptionalUser,
	withUser,
} from "@/lib/session";
import { NextApiResponse } from "next";
import db from "prisma/client";
import { ValidationError } from "yup";

export default withRouting({
	GET: withOptionalUser(handleGET),
	POST: withUser(handlePOST),
	PATCH: withUser(handlePATCH),
});

async function handleGET(
	req: OptionallyAuthorizedRequest,
	res: NextApiResponse
) {
	let query: PostsQuery;
	try {
		query = await postsQuerySchema.validate(req.query);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ errors: (e as ValidationError).errors });
	}
	const { authorId, take = 10, createdAt, cursor, draft = false } = query;

	const includeDrafts: boolean | undefined = draft
		? authorId !== undefined &&
		  req.user !== undefined &&
		  authorId === req.user.id
		: false;

	// TODO: filter drafts based on user
	const posts = await db.post.findMany({
		where: {
			authorId,
			draft: includeDrafts,
		},
		take: take + 1,
		...(cursor && {
			skip: 1,
			cursor: { id: cursor },
		}),
		orderBy: { createdAt },
		include: {
			author: { select: userResponseSelect },
		},
	});

	let nextCursor;
	if (posts.length === take + 1) {
		const lastPost = posts.pop();
		nextCursor = lastPost!.id;
	}

	res.status(200).json({
		posts,
		nextCursor,
	});
}

async function handlePOST(req: AuthorizedRequest, res: NextApiResponse) {
	let data: CreatePost;
	try {
		data = await createPostSchema.validate(req.body);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ errors: (e as ValidationError).errors });
	}

	const post = await db.post.create({
		data: { ...data, authorId: req.user.id, words: countWords(data.body) },
	});

	res.status(200).json(post);
}

async function handlePATCH(req: AuthorizedRequest, res: NextApiResponse) {
	let data: UpdatePost;
	try {
		data = await updatePostSchema.validate(req.body);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ errors: (e as ValidationError).errors });
	}

	const existingPost = await db.post.findFirst({
		where: { id: data.id },
	});

	if (!existingPost) {
		return res
			.status(404)
			.json({ error: "Post with this id doesn't exist" });
	} else if (existingPost.authorId !== req.user.id) {
		return res
			.status(403)
			.json({ error: "Not authorized to edit this post" });
	}

	let newWordsCount;
	if (data.body) {
		newWordsCount = countWords(data.body);
	}

	await db.post.update({
		where: { id: data.id },
		data: {
			...data,
			...(newWordsCount && { words: newWordsCount }),
		},
	});

	res.status(200).end();
}
