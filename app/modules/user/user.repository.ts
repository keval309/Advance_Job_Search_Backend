import { prisma } from "../../client/prisma";
import type { UserResponseDTO } from "./user.types";

export async function findById(userId: string): Promise<UserResponseDTO | null> {
	return prisma.user.findFirst({
		where: { id: userId, isDeleted: false },
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			bio: true,
			createdAt: true,
		},
	}) as Promise<UserResponseDTO | null>;
}
