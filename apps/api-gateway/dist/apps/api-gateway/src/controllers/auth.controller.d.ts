import { AuthService } from '../services/auth.service';
import { HttpService } from '@nestjs/axios';
import { LoginDto, RegisterDto, RefreshTokenDto } from '../dto';
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
    login(loginDto: LoginDto): Promise<any>;
    register(registerDto: RegisterDto): Promise<any>;
    refresh(refreshDto: RefreshTokenDto): Promise<any>;
    revoke(authHeader: string): Promise<any>;
}
