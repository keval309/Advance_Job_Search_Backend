import { prisma } from "../../client/prisma";
import type { AuthResponseDTO } from "./auth.types";

export async function findByEmail(email: string): Promise<{
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	bio: string | null;
	createdAt: Date;
} | null> {
	return prisma.user.findFirst({
		where: { email: email.toLowerCase(), isDeleted: false },
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			password: true,
			bio: true,
			createdAt: true,
		},
	}) as Promise<{
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		password: string;
		bio: string | null;
		createdAt: Date;
	} | null>;
}

export async function createUser(data: {
	firstName: string;
	lastName: string;
	email: string;
	passwordHash: string;
	bio?: string;
}): Promise<AuthResponseDTO> {
	const user = await prisma.user.create({
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email.toLowerCase(),
			password: data.passwordHash,
			bio: data.bio ?? null,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			bio: true,
			createdAt: true,
		},
	});
	return user as AuthResponseDTO;
}
