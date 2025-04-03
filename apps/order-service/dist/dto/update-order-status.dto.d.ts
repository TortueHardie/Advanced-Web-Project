export declare enum OrderStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    IN_PROGRESS = "in_progress",
    READY = "ready",
    DELIVERED = "delivered",
    CANCELED = "canceled"
}
export declare class UpdateOrderStatusDto {
    status: OrderStatus;
}
