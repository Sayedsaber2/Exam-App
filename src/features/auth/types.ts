import type { User } from "@/shared/types/user";

export interface AuthResponse  {
user:User;
token: string;
}