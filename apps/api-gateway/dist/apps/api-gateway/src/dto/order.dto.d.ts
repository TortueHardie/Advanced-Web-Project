export declare enum OrderStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    IN_PROGRESS = "IN_PROGRESS",
    READY = "READY",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED"
}
export declare enum PaymentMethod {
    CARD = "CARD",
    CASH = "CASH",
    PAYPAL = "PAYPAL"
}
export declare class OrderItemDto {
    articleId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    restaurantId: string;
    items: OrderItemDto[];
    deliveryAddress: string;
    paymentMethod: PaymentMethod;
}
export declare class OrderItemResponseDto {
    id: string;
    orderId: string;
    articleId: string;
    quantity: number;
    article: any;
}
export declare class OrderResponseDto {
    id: string;
    userId: string;
    restaurantId: string;
    deliveryAddress: string;
    totalAmount: number;
    deliveryFees: number;
    serviceFees: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    timestamps: any;
    orderItems: OrderItemResponseDto[];
    createdAt: Date;
    restaurant: any;
}
export declare class OrderListResponseDto {
    orders: OrderResponseDto[];
    total: number;
}
