import { RestaurantService } from '../services/restaurant.service';
import { CreateRestaurantDto, UpdateRestaurantDto, RestaurantDto, MenuDto } from '../dto';
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto>;
    findAll(): Promise<RestaurantDto[]>;
    findOne(id: number): Promise<RestaurantDto>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantDto>;
    remove(id: number): Promise<RestaurantDto>;
    findMenus(id: number): Promise<MenuDto[]>;
}
