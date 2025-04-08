import { HttpService } from '@nestjs/axios';
import { CreateOrderDto } from '../dto';
export declare class OrderController {
    private readonly httpService;
    private readonly orderServiceUrl;
    constructor(httpService: HttpService);
    private forwardRequest;
    createOrder(authHeader: string, createOrderDto: CreateOrderDto): Promise<any>;
    getUserOrders(authHeader: string): Promise<any>;
    getAdminOrders(authHeader: string): Promise<any>;
    getOrderById(authHeader: string, orderId: string): Promise<any>;
    cancelOrder(authHeader: string, orderId: string): Promise<any>;
}
