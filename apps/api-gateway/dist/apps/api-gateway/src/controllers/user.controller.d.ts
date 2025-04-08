import { HttpService } from '@nestjs/axios';
import { CreateUserDto, UpdateUserDto, ValidateUserDto } from '../dto';
export declare class UserController {
    private readonly httpService;
    private readonly userServiceUrl;
    constructor(httpService: HttpService);
    private forwardRequest;
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(authHeader: string): Promise<any>;
    findOne(authHeader: string, id: string): Promise<any>;
    update(authHeader: string, id: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(authHeader: string, id: string): Promise<any>;
    validateUser(credentials: ValidateUserDto): Promise<any>;
    findByEmail(authHeader: string, email: string): Promise<any>;
}
