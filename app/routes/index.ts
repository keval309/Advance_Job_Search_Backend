import { NextFunction, Response, Router } from "express";
import { customError, notFound } from "../utils/errorHandler";
import type { RequestExtended } from "../interfaces/global";
import { authRouter } from "../modules/auth";
import { userRouter } from "../modules/user";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

router.use(notFound);

function errorHandler(
	err: Error & { status?: number; code?: number; errorDescription?: string },
	req: RequestExtended,
	res: Response,
	_next: NextFunction
) {
	customError(err, req, res);
}
router.use(errorHandler);

export default router;
