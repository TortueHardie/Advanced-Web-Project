# Notification Service

This microservice manages in-app notifications for the application, providing the ability to send, retrieve, and manage notification statuses.

## Features

- Send notifications based on different templates (order status, referrals, promotions)
- Retrieve user-specific notifications
- Mark notifications as read
- In-memory storage of notifications (can be replaced with a database in production)

## API Endpoints

### Send Notifications

- `POST /notifications/send` - Send a generic notification
  ```json
  {
    "userId": 1,
    "type": "email",
    "template": "ORDER_CONFIRMED",
    "data": {
      "orderId": 1245,
      "totalAmount": "23.00€"
    }
  }
  ```

- `POST /notifications/order-status` - Send notification for order status change
  ```json
  {
    "orderId": 1245,
    "status": "delivered",
    "userId": 1
  }
  ```

- `POST /notifications/referral` - Send referral notification
  ```json
  {
    "userId": 1,
    "referralCode": "1234-5678"
  }
  ```

### Retrieve & Manage Notifications

- `GET /notifications/user/:userId` - Get all notifications for a specific user
- `PUT /notifications/:notificationId/read` - Mark a notification as read
  ```json
  {
    "userId": 1
  }
  ```

## Integration with Frontend

This service is designed to be called directly from your backend services when events happen (like order status changes) and then have the frontend poll for new notifications.

### Example Frontend Integration

1. **Notification Component**
   ```jsx
   function NotificationCenter() {
     const [notifications, setNotifications] = useState([]);
     const userId = useAuth().userId;
     
     useEffect(() => {
       // Poll for new notifications every 30 seconds
       const fetchNotifications = async () => {
         const response = await fetch(`/api/notifications/user/${userId}`);
         const data = await response.json();
         setNotifications(data.notifications);
       };
       
       fetchNotifications();
       const interval = setInterval(fetchNotifications, 30000);
       
       return () => clearInterval(interval);
     }, [userId]);
     
     const markAsRead = async (notificationId) => {
       await fetch(`/api/notifications/${notificationId}/read`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ userId })
       });
       
       setNotifications(notifications.map(n => 
         n.id === notificationId ? {...n, isRead: true} : n
       ));
     };
     
     return (
       <div className="notification-center">
         {notifications.map(notification => (
           <div key={notification.id} className={notification.isRead ? 'read' : 'unread'}>
             <p>{notification.content}</p>
             {!notification.isRead && (
               <button onClick={() => markAsRead(notification.id)}>Mark as read</button>
             )}
           </div>
         ))}
       </div>
     );
   }
   ```

2. **Restaurant Order Management**
   ```jsx
   function OrderManagement() {
     const updateOrderStatus = async (orderId, status, userId) => {
       // Update order status in the order service
       await fetch('/api/orders/update-status', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ orderId, status })
       });
       
       // Send notification about the status change
       await fetch('/api/notifications/order-status', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ orderId, status, userId })
       });
     };
     
     return (
       // Order management UI
     );
   }
   ```

## Development

1. Copy `.env.example` to `.env` and configure as needed
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev` 