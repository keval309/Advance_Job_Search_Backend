import { Router } from "express";
import asyncHandler from "../../utils/async-handler";
import { isAuthenticated } from "../../middleware/authMiddleware";
import type { RequestExtended } from "../../interfaces/global";
import * as userService from "./user.service";
import { getUserByIdValidator } from "./user.validator";

const router = Router();
router.use(isAuthenticated);

router.get(
	"/:id",
	getUserByIdValidator,
	asyncHandler(async (req) => {
		const id = req.params.id as string;
		return userService.getUserById(id);
	})
);

export default router;
