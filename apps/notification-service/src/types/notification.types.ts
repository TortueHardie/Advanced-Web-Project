export type NotificationType = 'email' | 'sms' | 'push';

export type NotificationTemplate =
  | 'ORDER_CONFIRMED'
  | 'ORDER_PREPARING'
  | 'ORDER_OUT_FOR_DELIVERY'
  | 'ORDER_DELIVERED'
  | 'REFERRAL_SUCCESS'
  | 'PROMOTION';

export interface NotificationData {
  userName?: string;
  orderId?: number;
  totalAmount?: string;
  [key: string]: any;
}

export interface SendNotificationRequest {
  userId: number;
  type: NotificationType;
  template: NotificationTemplate;
  data: NotificationData;
}

export interface OrderStatusNotificationRequest {
  orderId: number;
  status: string;
  userId: number;
}

export interface ReferralNotificationRequest {
  userId: number;
  referralCode: string;
} 