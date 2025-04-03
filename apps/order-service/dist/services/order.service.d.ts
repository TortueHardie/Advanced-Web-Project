import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../interfaces/order.interface';
import { OrderStatus } from '../dto/update-order-status.dto';
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: OrderRepository);
    createOrder(userId: number, createOrderDto: CreateOrderDto): Promise<{
        orderId: number;
        status: string;
        totalAmount: number;
    }>;
    getUserOrders(userId: number): Promise<any[]>;
    getOrderById(userId: number, orderId: number): Promise<Order>;
    cancelOrder(userId: number, orderId: number): Promise<{
        message: string;
    }>;
    updateOrderStatus(orderId: number, status: OrderStatus): Promise<{
        message: string;
    }>;
    getAdminOrders(): Promise<any[]>;
    private validateStatusTransition;
}
