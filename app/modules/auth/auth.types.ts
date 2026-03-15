export interface RegisterDTO {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface LoginDTO {
	email: string;
	password: string;
}

export interface AuthUserPayload {
	id: string;
	email: string;
}

export interface AuthResponseDTO {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	bio: string | null;
	createdAt: Date;
}
