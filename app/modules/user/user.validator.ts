import { param } from "express-validator";

export const getUserByIdValidator = [
	param("id").isUUID().withMessage("Invalid user id"),
];
