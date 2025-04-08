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
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RestaurateurOrdersComponent } from './components/restaurateur-orders/restaurateur-orders.component';
import { LoginComponent } from './pages/login/login.component';
import { RestaurateurMenuManagementComponent } from './components/restaurateur-menu-management/restaurateur-menu-management.component';
import { RestaurateurProfileComponent } from './components/restaurateur-profile/restaurateur-profile.component';
import { RestaurateurProfileUpdateComponent } from './components/restaurateur-profile/restaurateur-profile-update/restaurateur-profile-update.component';
import { DelivererOrdersComponent } from './components/deliverer-orders/deliverer-orders.component';
import { DelivererProfileComponent } from './components/deliverer-profile/deliverer-profile.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  // Customer
  { path: 'customer-purchase', component: CustomerPurchaseComponent },
  { path: 'compte', component: ProfileComponent },
  { path: 'compte/modifier', component: ProfileUpdateComponent },
  { path: 'commandes', component: OrdersComponent },
  { path: 'commandes/:id', component: OrderViewComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  // Restaurateur
  { path: 'restaurateur/compte', component: RestaurateurProfileComponent },
  { path: 'restaurateur/compte/modifier', component: RestaurateurProfileUpdateComponent },
  { path: 'restaurateur/menu-management', component: RestaurateurMenuManagementComponent },
  { path: 'restaurateur/commandes', component: RestaurateurOrdersComponent },
  { path: 'restaurateur/statistiques', component: StatisticsComponent },
  // Deliverer
  { path: 'deliverer/compte', component: DelivererProfileComponent },
  { path: 'deliverer/commandes', component: DelivererOrdersComponent },
  { path: '**', redirectTo: '' }
];
