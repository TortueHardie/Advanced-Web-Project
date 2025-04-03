import { OrderStatus } from "../dto/update-order-status.dto";
export declare class OrderItem {
    id?: number;
    productId: number;
    quantity: number;
    unitPrice?: number;
    name?: string;
    orderId?: number;
}
export declare class OrderTimestamps {
    createdAt: Date;
    acceptedAt?: Date;
    inProgressAt?: Date;
    readyAt?: Date;
    deliveredAt?: Date;
    canceledAt?: Date;
}
export declare class Order {
    orderId: number;
    userId: number;
    restaurantId: number;
    restaurantName?: string;
    items: OrderItem[];
    deliveryAddress: string;
    paymentMethod: string;
    status: OrderStatus;
    totalAmount: number;
    deliveryFees: number;
    serviceFees: number;
    timestamps: OrderTimestamps;
}
