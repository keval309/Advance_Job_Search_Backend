import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiException, ErrorCodes } from "../../utils/response";
import * as authRepository from "./auth.repository";
import type {
	AuthResponseDTO,
	AuthUserPayload,
	LoginDTO,
	RegisterDTO,
} from "./auth.types";

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = "7d";

function getJwtSecret(): string {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET is not set");
	}
	return secret;
}

export function signToken(payload: AuthUserPayload): string {
	return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
}

export async function register(dto: RegisterDTO): Promise<{
	user: AuthResponseDTO;
	token: string;
}> {
	const existing = await authRepository.findByEmail(dto.email);
	if (existing) {
		throw new ApiException({
			...ErrorCodes.BAD_REQUEST,
			errorDescription: "Email already registered",
		});
	}
	const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
	const user = await authRepository.createUser({
		firstName: dto.firstName.trim(),
		lastName: dto.lastName.trim(),
		email: dto.email.trim(),
		passwordHash,
	});
	const token = signToken({ id: user.id, email: user.email });
	return { user, token };
}

export async function login(dto: LoginDTO): Promise<{
	user: AuthResponseDTO;
	token: string;
}> {
	const found = await authRepository.findByEmail(dto.email);
	if (!found) {
		throw new ApiException({
			...ErrorCodes.UNAUTHORIZED,
			errorDescription: "Invalid email or password",
		});
	}
	const match = await bcrypt.compare(dto.password, found.password);
	if (!match) {
		throw new ApiException({
			...ErrorCodes.UNAUTHORIZED,
			errorDescription: "Invalid email or password",
		});
	}
	const user: AuthResponseDTO = {
		id: found.id,
		firstName: found.firstName,
		lastName: found.lastName,
		email: found.email,
		bio: found.bio,
		createdAt: found.createdAt,
	};
	const token = signToken({ id: user.id, email: user.email });
	return { user, token };
}
