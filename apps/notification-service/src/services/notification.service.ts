import { NotificationType, NotificationTemplate, NotificationData } from '../types/notification.types';

// In-memory store for active notifications (in a production app, this would be a database)
interface Notification {
  id: string;
  userId: number;
  type: NotificationType;
  template: NotificationTemplate;
  content: string;
  data: NotificationData;
  isRead: boolean;
  createdAt: Date;
}

class NotificationService {
  private notifications: Notification[] = [];
  private notificationCounter = 0;

  async sendNotification(
    userId: number,
    type: NotificationType,
    template: NotificationTemplate,
    data: NotificationData
  ): Promise<Notification> {
    try {
      const content = this.generateNotificationContent(template, data);
      
      const notification: Notification = {
        id: (++this.notificationCounter).toString(),
        userId,
        type,
        template,
        content,
        data,
        isRead: false,
        createdAt: new Date(),
      };
      
      this.notifications.push(notification);
      
      console.log(`Notification sent to user ${userId}: ${content}`);
      
      return notification;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  async sendOrderStatusNotification(orderId: number, status: string, userId: number): Promise<Notification> {
    const template = this.getTemplateForOrderStatus(status);
    return this.sendNotification(userId, 'email', template, { orderId });
  }

  async sendReferralNotification(userId: number, referralCode: string): Promise<Notification> {
    return this.sendNotification(userId, 'email', 'REFERRAL_SUCCESS', { referralCode });
  }

  private generateNotificationContent(template: NotificationTemplate, data: NotificationData): string {
    switch (template) {
      case 'ORDER_CONFIRMED':
        return `Your order #${data.orderId} has been confirmed. Total amount: ${data.totalAmount}`;
      case 'ORDER_PREPARING':
        return `Your order #${data.orderId} is being prepared.`;
      case 'ORDER_OUT_FOR_DELIVERY':
        return `Your order #${data.orderId} is out for delivery.`;
      case 'ORDER_DELIVERED':
        return `Your order #${data.orderId} has been delivered. Enjoy your meal!`;
      case 'REFERRAL_SUCCESS':
        return `Your referral with code ${data.referralCode} was successful!`;
      case 'PROMOTION':
        return `Special promotion: ${data.promotionText}`;
      default:
        throw new Error('Invalid template');
    }
  }

  private getTemplateForOrderStatus(status: string): NotificationTemplate {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'ORDER_CONFIRMED';
      case 'preparing':
        return 'ORDER_PREPARING';
      case 'out_for_delivery':
        return 'ORDER_OUT_FOR_DELIVERY';
      case 'delivered':
        return 'ORDER_DELIVERED';
      default:
        throw new Error('Invalid order status');
    }
  }

  // Get all notifications for a user
  async getUserNotifications(userId: number): Promise<Notification[]> {
    return this.notifications.filter(notification => notification.userId === userId);
  }

  // Mark notification as read
  async markAsRead(notificationId: string, userId: number): Promise<boolean> {
    const notification = this.notifications.find(
      n => n.id === notificationId && n.userId === userId
    );
    
    if (notification) {
      notification.isRead = true;
      return true;
    }
    
    return false;
  }
}

export default new NotificationService(); 