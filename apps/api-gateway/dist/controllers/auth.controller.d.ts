import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    verifyToken(authHeader: string): Promise<{
        isValid: boolean;
        user: any;
    }>;
}
