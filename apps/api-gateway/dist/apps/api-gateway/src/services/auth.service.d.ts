import { HttpService } from '@nestjs/axios';
export declare class AuthService {
    private readonly httpService;
    constructor(httpService: HttpService);
    verifyToken(token: string): Promise<{
        isValid: boolean;
        user?: any;
        error?: string;
    }>;
}
