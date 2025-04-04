import { RestaurantRepository } from '../repositories/restaurant.repository';
import { CreateRestaurantDto, UpdateRestaurantDto, RestaurantDto } from '../dto';
export declare class RestaurantService {
    private readonly restaurantRepository;
    constructor(restaurantRepository: RestaurantRepository);
    create(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto>;
    findAll(): Promise<RestaurantDto[]>;
    findOne(id: number): Promise<RestaurantDto>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantDto>;
    remove(id: number): Promise<RestaurantDto>;
    findMenus(restaurantId: number): Promise<({
        items: {
            description: string;
            type: string;
            id: number;
            name: string;
            price: number;
            restaurantId: number;
        }[];
    } & {
        description: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    })[]>;
}
