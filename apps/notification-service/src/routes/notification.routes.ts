import { Router } from 'express';
import { body } from 'express-validator';
import {
  sendNotification,
  sendOrderStatusNotification,
  sendReferralNotification,
  getUserNotifications,
  markNotificationAsRead
} from '../controllers/notification.controller';

const router = Router();

// Validation middleware for send notification
const validateSendNotification = [
  body('userId').isInt().withMessage('userId must be an integer'),
  body('type').isIn(['email', 'sms', 'push']).withMessage('Invalid notification type'),
  body('template').isString().notEmpty().withMessage('template is required'),
  body('data').isObject().withMessage('data must be an object'),
];

// Validation middleware for order status notification
const validateOrderStatusNotification = [
  body('orderId').isInt().withMessage('orderId must be an integer'),
  body('status').isString().notEmpty().withMessage('status is required'),
  body('userId').isInt().withMessage('userId must be an integer'),
];

// Validation middleware for referral notification
const validateReferralNotification = [
  body('userId').isInt().withMessage('userId must be an integer'),
  body('referralCode').isString().notEmpty().withMessage('referralCode is required'),
];

// Validation middleware for marking notification as read
const validateMarkAsRead = [
  body('userId').isInt().withMessage('userId must be an integer'),
];

// Routes for sending notifications
router.post('/send', validateSendNotification, sendNotification);
router.post('/order-status', validateOrderStatusNotification, sendOrderStatusNotification);
router.post('/referral', validateReferralNotification, sendReferralNotification);

// Routes for retrieving and managing notifications
router.get('/user/:userId', getUserNotifications);
router.put('/:notificationId/read', validateMarkAsRead, markNotificationAsRead);

export default router; 