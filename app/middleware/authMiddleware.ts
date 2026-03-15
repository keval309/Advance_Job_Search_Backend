import { NextFunction, Response } from "express";
import { ApiException, ErrorCodes } from "../utils/response";
import type { RequestExtended } from "../interfaces/global";

/**
 * Use on protected routes. Ensures req.user is set from JWT/session.
 * Attach after parsing auth header (e.g. Bearer token).
 */
export function isAuthenticated(
	req: RequestExtended,
	_res: Response,
	next: NextFunction
): void {
	if (req.user?.id) {
		next();
		return;
	}
	next(
		new ApiException({
			...ErrorCodes.UNAUTHORIZED,
			errorDescription: "Authentication required",
		})
	);
}
