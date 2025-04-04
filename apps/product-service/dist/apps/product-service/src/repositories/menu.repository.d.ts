import { PrismaService } from '@advanced-web/prisma/src/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from '../dto';
export declare class MenuRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateMenuDto): Promise<any>;
    findAll(restaurantId: number): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, data: UpdateMenuDto): Promise<any>;
    remove(id: number): Promise<any>;
    updateAvailability(id: number, isAvailable: boolean): Promise<any>;
}
