import { UserRole } from './auth.dto';
export declare enum UserStatus {
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED"
}
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    phoneNumber?: string;
    role?: UserRole;
}
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phoneNumber?: string;
}
export declare class UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    address: string;
    phoneNumber?: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
}
export declare class ValidateUserDto {
    email: string;
    password: string;
}
