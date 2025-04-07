import { HttpService } from '@nestjs/axios';
export declare class OrderController {
    private readonly httpService;
    private readonly orderServiceUrl;
    constructor(httpService: HttpService);
    private forwardRequest;
    createOrder(authHeader: string, createOrderDto: any): Promise<any>;
    getUserOrders(authHeader: string): Promise<any>;
    getAdminOrders(authHeader: string): Promise<any>;
    getOrderById(authHeader: string, orderId: string): Promise<any>;
    cancelOrder(authHeader: string, orderId: string): Promise<any>;
}
