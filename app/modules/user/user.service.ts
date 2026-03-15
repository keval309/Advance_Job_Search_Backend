import { ApiException, ErrorCodes } from "../../utils/response";
import * as userRepository from "./user.repository";
import type { UserResponseDTO } from "./user.types";

export async function getUserById(userId: string): Promise<UserResponseDTO> {
	const user = await userRepository.findById(userId);
	if (!user) {
		throw new ApiException({
			...ErrorCodes.NOT_FOUND,
			errorDescription: "User not found",
		});
	}
	return user;
}
