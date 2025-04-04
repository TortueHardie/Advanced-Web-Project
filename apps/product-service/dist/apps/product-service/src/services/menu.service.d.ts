import { MenuRepository } from '../repositories/menu.repository';
import { CreateMenuDto, UpdateMenuDto, MenuDto } from '../dto';
export declare class MenuService {
    private readonly menuRepository;
    constructor(menuRepository: MenuRepository);
    create(createMenuDto: CreateMenuDto): Promise<MenuDto>;
    findAll(restaurantId: number): Promise<MenuDto[]>;
    findOne(id: number): Promise<MenuDto>;
    update(id: number, updateMenuDto: UpdateMenuDto): Promise<MenuDto>;
    remove(id: number): Promise<MenuDto>;
    updateAvailability(id: number, isAvailable: boolean): Promise<MenuDto>;
}
