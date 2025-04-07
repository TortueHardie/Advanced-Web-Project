import { RestaurantStatus } from '@prisma/client';
export declare class UpdateRestaurantDto {
    name?: string;
    city?: string;
    deliveryFees?: number;
    description?: string;
    status?: RestaurantStatus;
}
