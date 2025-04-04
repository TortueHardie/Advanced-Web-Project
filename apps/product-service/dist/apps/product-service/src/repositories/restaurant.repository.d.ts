import { PrismaService } from '@advanced-web/prisma/src/prisma.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../dto';
export declare class RestaurantRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateRestaurantDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, data: UpdateRestaurantDto): Promise<any>;
    remove(id: number): Promise<any>;
    findMenus(restaurantId: number): Promise<any>;
}
