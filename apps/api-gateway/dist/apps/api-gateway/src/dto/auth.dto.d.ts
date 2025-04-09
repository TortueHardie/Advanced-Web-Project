export declare enum UserRole {
    CLIENT = "CLIENT",
    LIVREUR = "LIVREUR",
    RESTAURATEUR = "RESTAURATEUR",
    ADMIN = "ADMIN"
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
    address: string;
    birthDate: string;
    siret?: string;
    iban?: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class TokenResponseDto {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    user: any;
}
