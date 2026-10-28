export type UserRole = "ADMIN" | "SUPER_ADMIN" | "USER";

export interface User {
    id: string;
    username: string;
    email: string | null;
    phone: string | null;
    firstName: string;
    lastName: string;
    profilePhoto: string | null;
    emailVerified: boolean;
    role: UserRole;
    createdAt: string;
}

