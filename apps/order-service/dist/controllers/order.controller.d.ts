import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { OrderStatus } from '../dto/update-order-status.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    private getUserIdFromToken;
    private isAdmin;
    private isRestaurant;
    createOrder(headers: any, createOrderDto: CreateOrderDto): Promise<{
        orderId: number;
        status: string;
        totalAmount: number;
    }>;
    getUserOrders(auth: string): Promise<any[]>;
    getAdminOrders(auth: string): Promise<any[]>;
    getOrder(auth: string, orderId: string): Promise<{
        orderId: number;
        restaurantName: string;
        items: {
            name: string;
            quantity: number;
            unitPrice: number;
        }[];
        deliveryFees: number;
        serviceFees: number;
        totalAmount: number;
        status: OrderStatus;
        timestamps: {
            createdAt: Date;
            acceptedAt: Date;
            deliveredAt: Date;
        };
    }>;
    cancelOrder(auth: string, orderId: string): Promise<{
        message: string;
    }>;
    updateOrderStatus(auth: string, orderId: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        message: string;
    }>;
    createOrderMessage(data: {
        userId: number;
        order: CreateOrderDto;
    }): Promise<{
        orderId: number;
        status: string;
        totalAmount: number;
    }>;
    getUserOrdersMessage(userId: number): Promise<any[]>;
    getOrderByIdMessage(data: {
        userId: number;
        orderId: number;
    }): Promise<import("../interfaces/order.interface").Order>;
    cancelOrderMessage(data: {
        userId: number;
        orderId: number;
    }): Promise<{
        message: string;
    }>;
    updateOrderStatusMessage(data: {
        orderId: number;
        status: OrderStatus;
    }): Promise<{
        message: string;
    }>;
    getAdminOrdersMessage(): Promise<any[]>;
}
