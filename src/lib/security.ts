import * as bcrypt from "bcrypt";

const saltRounds = 10;

export async function getPasswordHash(password: string): Promise<string> {
	return await bcrypt.hash(password, saltRounds);
}

export async function validatePassword(
	password: string,
	hash: string
): Promise<boolean> {
	return await bcrypt.compare(password, hash);
}
