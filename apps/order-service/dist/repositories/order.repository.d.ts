import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../interfaces/order.interface';
import { OrderStatus } from '../dto/update-order-status.dto';
export declare class OrderRepository {
    constructor();
    createOrder(userId: number, createOrderDto: CreateOrderDto, totalAmount: number): Promise<Order>;
    getUserOrders(userId: number): Promise<Order[]>;
    getOrderById(orderId: number): Promise<Order | null>;
    cancelOrder(orderId: number): Promise<boolean>;
    updateOrderStatus(orderId: number, status: OrderStatus): Promise<boolean>;
    getAdminOrders(): Promise<Order[]>;
    private getTimestampFieldForStatus;
}
