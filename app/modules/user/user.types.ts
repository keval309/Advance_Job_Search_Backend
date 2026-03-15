export interface UserResponseDTO {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	bio: string | null;
	createdAt: Date;
}

export interface CreateUserDTO {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	bio?: string;
}

export interface UpdateUserDTO {
	firstName?: string;
	lastName?: string;
	bio?: string;
}
