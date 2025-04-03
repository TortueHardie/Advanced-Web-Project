export declare class OrderItemDto {
    productId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    restaurantId: number;
    items: OrderItemDto[];
    deliveryAddress: string;
    paymentMethod: string;
}
