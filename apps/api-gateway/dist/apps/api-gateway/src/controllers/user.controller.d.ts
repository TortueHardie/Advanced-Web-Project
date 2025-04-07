import { HttpService } from '@nestjs/axios';
export declare class UserController {
    private readonly httpService;
    private readonly userServiceUrl;
    constructor(httpService: HttpService);
    private forwardRequest;
    create(createUserDto: any): Promise<any>;
    findAll(authHeader: string): Promise<any>;
    findOne(authHeader: string, id: string): Promise<any>;
    update(authHeader: string, id: string, updateUserDto: any): Promise<any>;
    remove(authHeader: string, id: string): Promise<any>;
    validateUser(credentials: {
        email: string;
        password: string;
    }): Promise<any>;
    findByEmail(authHeader: string, email: string): Promise<any>;
}
