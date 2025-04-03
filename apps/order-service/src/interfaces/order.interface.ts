import { OrderStatus } from "../dto/update-order-status.dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrderItem {
  id?: number;
  
  /**
   * ID of the product in the order
   */
  productId: number;
  
  /**
   * Quantity of the product ordered
   */
  quantity: number;
  
  /**
   * Unit price of the product
   */
  unitPrice?: number;
  
  /**
   * Name of the product
   */
  name?: string;
  
  /**
   * Reference to the parent order
   */
  orderId?: number;
}

export class OrderTimestamps {
  /**
   * When the order was created
   */
  createdAt: Date;
  
  /**
   * When the order was accepted by the restaurant
   */
  acceptedAt?: Date;
  
  /**
   * When the order moved to in_progress state
   */
  inProgressAt?: Date;
  
  /**
   * When the order was ready for delivery
   */
  readyAt?: Date;
  
  /**
   * When the order was delivered to the customer
   */
  deliveredAt?: Date;
  
  /**
   * When the order was canceled
   */
  canceledAt?: Date;
}

export class Order {
  /**
   * Unique identifier for the order
   */
  orderId: number;
  
  /**
   * ID of the user who placed the order
   */
  userId: number;
  
  /**
   * ID of the restaurant
   */
  restaurantId: number;
  
  /**
   * Name of the restaurant
   */
  restaurantName?: string;
  
  /**
   * List of items in the order
   */
  items: OrderItem[];
  
  /**
   * Delivery address for the order
   */
  deliveryAddress: string;
  
  /**
   * Payment method used for the order
   */
  paymentMethod: string;
  
  /**
   * Current status of the order
   */
  status: OrderStatus;
  
  /**
   * Total amount charged for the order
   */
  totalAmount: number;
  
  /**
   * Delivery fees charged
   */
  deliveryFees: number;
  
  /**
   * Service fees charged by Pop-Eat (30%)
   */
  serviceFees: number;
  
  /**
   * Timestamps for order state transitions
   */
  timestamps: OrderTimestamps;
} 