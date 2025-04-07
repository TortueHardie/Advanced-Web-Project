export declare class UserController {
    private client;
    constructor();
    create(createUserDto: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateUserDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
