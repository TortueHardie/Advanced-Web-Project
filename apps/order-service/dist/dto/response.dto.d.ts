export declare class OrderSummaryDto {
    orderId: number;
    restaurantName: string;
    createdAt: Date;
    status: string;
    totalAmount: number;
}
export declare class OrderItemResponseDto {
    name: string;
    quantity: number;
    unitPrice: number;
}
export declare class OrderTimestampsDto {
    createdAt: Date;
    acceptedAt: Date | null;
    deliveredAt: Date | null;
}
export declare class OrderDetailDto {
    orderId: number;
    restaurantName: string;
    items: OrderItemResponseDto[];
    deliveryFees: number;
    serviceFees: number;
    totalAmount: number;
    status: string;
    timestamps: OrderTimestampsDto;
}
export declare class OrderCreatedDto {
    orderId: number;
    status: string;
    totalAmount: number;
}
export declare class MessageResponseDto {
    message: string;
}
export declare class AdminOrderSummaryDto extends OrderSummaryDto {
    userId: number;
}
