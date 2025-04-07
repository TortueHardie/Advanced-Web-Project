import { AuthService } from '../services/auth.service';
import { HttpService } from '@nestjs/axios';
export declare class AuthController {
    private readonly authService;
    private readonly httpService;
    private readonly authServiceUrl;
    constructor(authService: AuthService, httpService: HttpService);
    private forwardRequest;
    verifyToken(authHeader: string): Promise<{
        isValid: boolean;
        user: any;
    }>;
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<any>;
    register(registerDto: {
        email: string;
        password: string;
        name: string;
    }): Promise<any>;
    refresh(refreshDto: {
        refreshToken: string;
    }): Promise<any>;
    revoke(authHeader: string): Promise<any>;
}
