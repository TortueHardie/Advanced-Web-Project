import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import notificationService from '../services/notification.service';
import {
  SendNotificationRequest,
  OrderStatusNotificationRequest,
  ReferralNotificationRequest,
} from '../types/notification.types';

export const sendNotification = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, type, template, data } = req.body as SendNotificationRequest;
    const notification = await notificationService.sendNotification(userId, type, template, data);
    
    res.status(200).json({ 
      message: 'Notification sent successfully',
      notification
    });
  } catch (error) {
    console.error('Error in sendNotification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
};

export const sendOrderStatusNotification = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { orderId, status, userId } = req.body as OrderStatusNotificationRequest;
    const notification = await notificationService.sendOrderStatusNotification(orderId, status, userId);
    
    res.status(200).json({ 
      message: 'Order status notification sent successfully',
      notification
    });
  } catch (error) {
    console.error('Error in sendOrderStatusNotification:', error);
    res.status(500).json({ error: 'Failed to send order status notification' });
  }
};

export const sendReferralNotification = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, referralCode } = req.body as ReferralNotificationRequest;
    const notification = await notificationService.sendReferralNotification(userId, referralCode);
    
    res.status(200).json({ 
      message: 'Referral notification sent successfully',
      notification
    });
  } catch (error) {
    console.error('Error in sendReferralNotification:', error);
    res.status(500).json({ error: 'Failed to send referral notification' });
  }
};

export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    const notifications = await notificationService.getUserNotifications(userId);
    
    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error in getUserNotifications:', error);
    res.status(500).json({ error: 'Failed to get user notifications' });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const userId = parseInt(req.body.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    const success = await notificationService.markAsRead(notificationId, userId);
    
    if (!success) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error in markNotificationAsRead:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
}; 