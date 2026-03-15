import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { RequestExtended } from "../interfaces/global";
import type { AuthUserPayload } from "../modules/auth/auth.types";

const COOKIE_NAME = "access_token";

function getJwtSecret(): string {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET is not set");
	}
	return secret;
}

/**
 * Reads JWT from cookie (access_token) or Authorization Bearer header.
 * If valid, sets req.user. If missing or invalid, leaves req.user undefined.
 */
export function parseJwt(
	req: RequestExtended,
	_res: Response,
	next: NextFunction
): void {
	const token =
		req.cookies?.[COOKIE_NAME] ??
		(req.headers.authorization?.startsWith("Bearer ")
			? req.headers.authorization.slice(7)
			: null);

	if (!token) {
		next();
		return;
	}

	try {
		const decoded = jwt.verify(token, getJwtSecret()) as AuthUserPayload & {
			iat?: number;
			exp?: number;
		};
		req.user = {
			id: decoded.id,
			email: decoded.email,
		};
	} catch {
		// Invalid or expired token; leave req.user undefined
	}
	next();
}

export { COOKIE_NAME };
