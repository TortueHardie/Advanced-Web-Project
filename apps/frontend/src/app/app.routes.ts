import { Routes } from '@angular/router';
import { CustomerPurchaseComponent } from './components/customer-purchase/customer-purchase.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileUpdateComponent } from './components/profile/profile-update/profile-update.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderViewComponent } from './components/orders/order-view/order-view.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { RestaurateurItemUpdateComponent } from './components/restaurateur-item-update/restaurateur-item-update.component';
import { RestaurateurMenuUpdateComponent } from './components/restaurateur-menu-update/restaurateur-menu-update.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RestaurateurOrdersComponent } from './components/restaurateur-orders/restaurateur-orders.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'customer-purchase', component: CustomerPurchaseComponent },
  { path: 'compte', component: ProfileComponent },
  { path: 'compte/modifier', component: ProfileUpdateComponent },
  { path: 'commandes', component: OrdersComponent },
  { path: 'commandes/:id', component: OrderViewComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  { path: 'restaurateur/article/nouveau', component: RestaurateurItemUpdateComponent },
  { path: 'restaurateur/article/:id', component: RestaurateurItemUpdateComponent },
  { path: 'restaurateur/menu/nouveau', component: RestaurateurMenuUpdateComponent },
  { path: 'restaurateur/menu/:id', component: RestaurateurMenuUpdateComponent },
  { path: 'restaurateur/commandes', component: RestaurateurOrdersComponent },
  { path: 'restaurateur/statistiques', component: StatisticsComponent },
  { path: '**', redirectTo: '' }
];
