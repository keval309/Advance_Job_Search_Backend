import { body } from "express-validator";

const PASSWORD_MIN_LENGTH = 8;
const passwordRules = [
	body("password")
		.isLength({ min: PASSWORD_MIN_LENGTH })
		.withMessage(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`),
	body("password")
		.matches(/\p{Lu}/u)
		.withMessage("Password must contain at least one uppercase letter"),
	body("password")
		.matches(/\p{Ll}/u)
		.withMessage("Password must contain at least one lowercase letter"),
	body("password")
		.matches(/\d/)
		.withMessage("Password must contain at least one number"),
	body("password")
		.matches(/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~;]/)
		.withMessage("Password must contain at least one special character"),
];

export const registerValidator = [
	body("firstName").trim().notEmpty().withMessage("First name is required"),
	body("lastName").trim().notEmpty().withMessage("Last name is required"),
	body("email").trim().isEmail().withMessage("Valid email is required"),
	body("password").trim().notEmpty().withMessage("Password is required"),
	...passwordRules,
	body("confirmPassword")
		.custom((value, { req }) => value === req.body?.password)
		.withMessage("Passwords must match"),
];

export const loginValidator = [
	body("email").trim().isEmail().withMessage("Valid email is required"),
	body("password").trim().notEmpty().withMessage("Password is required"),
];
