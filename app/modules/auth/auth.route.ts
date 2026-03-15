import { Router, Response } from "express";
import asyncHandler from "../../utils/async-handler";
import { isAuthenticated } from "../../middleware/authMiddleware";
import type { RequestExtended } from "../../interfaces/global";
import * as authService from "./auth.service";
import { COOKIE_NAME } from "../../middleware/jwtMiddleware";
import { registerValidator, loginValidator } from "./auth.validator";
import * as userService from "../user/user.service";

const router = Router();

const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax" as const,
	maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	path: "/",
};

router.post(
	"/register",
	registerValidator,
	asyncHandler(async (req, res) => {
		const { firstName, lastName, email, password, confirmPassword } = req.body;
		const { user, token } = await authService.register({
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
		});
		res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
		return user;
	})
);

router.post(
	"/login",
	loginValidator,
	asyncHandler(async (req, res) => {
		const { email, password } = req.body;
		const { user, token } = await authService.login({ email, password });
		res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
		return user;
	})
);

router.post("/logout", (_req, res: Response) => {
	res.clearCookie(COOKIE_NAME, { path: "/" });
	res.status(204).end();
});

router.get(
	"/me",
	isAuthenticated,
	asyncHandler(async (req) => {
		const id = (req as RequestExtended).user!.id;
		return userService.getUserById(id);
	})
);

export default router;
