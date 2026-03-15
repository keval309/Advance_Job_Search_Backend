export const ErrorCodes = {
	BAD_REQUEST: { status: 400, code: 102, message: "Bad request" },
	NOT_FOUND: { status: 404, code: 104, message: "Not found" },
	UNAUTHORIZED: { status: 401, code: 101, message: "Unauthorized" },
	GENERATE_BAD_REQUEST: (errorDescription: string) => ({
		...ErrorCodes.BAD_REQUEST,
		message: errorDescription,
		errorDescription,
	}),
};

export const BaseResponse = (result: unknown) => ({
	...(typeof result === "object" && result !== null ? result : {}),
	responseStatus: 200,
});

export class ApiException extends Error {
	status?: number;
	code?: number;
	errorDescription?: string;

	constructor({
		status,
		code,
		message,
		errorDescription,
	}: {
		status?: number;
		code?: number;
		message?: string;
		errorDescription?: string;
	}) {
		super(message);

		if (!status && !code && !message && !errorDescription) {
			throw new Error("ApiException must have at least one parameter");
		}

		this.status = status ?? 500;
		this.code = code;
		this.errorDescription = errorDescription ?? message;
	}
}
