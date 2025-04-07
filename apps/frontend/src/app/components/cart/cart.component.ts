import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { CartDeleteDialogComponent } from './cart-delete-dialog/cart-delete-dialog.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <div class="cart-container">
      <div class="cart-items">
        <div class="cart-item" *ngFor="let item of cartItems">
          <div class="item-content">
          <img [src]="item.image || 'assets/images/burger.png'" [alt]="item.name" class="item-image" onerror="this.src='assets/images/burger.png'">
          <div class="item-details">
              <div class="item-info">
                <h3>{{ item.name }}</h3>
                <p class="restaurant">Restaurateur</p>
              </div>
              <div class="item-controls">
                <button mat-icon-button (click)="decreaseQuantity(item)">
                  <mat-icon>remove</mat-icon>
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button mat-icon-button (click)="increaseQuantity(item)">
                  <mat-icon>add</mat-icon>
                </button>
                <span class="price">{{ item.price * item.quantity }}€</span>
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="cartItems.length === 0" class="empty-cart">
          <p>Votre panier est vide</p>
        </div>
        <div *ngIf="cartItems.length > 0" class="cart-actions">
          <button mat-raised-button color="warn" class="cancel-btn" (click)="openDeleteDialog()">ANNULER</button>
          <button mat-raised-button color="primary" class="order-btn" (click)="proceedToCheckout()">COMMANDER</button>
        </div>
      </div>

      
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 8px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .cart-items {
      flex: 1;
      overflow-y: auto;
    }

    .cart-item {
      margin-bottom: 8px;
      padding: 4px;
      border-bottom: 1px solid #eee;
    }

    .item-content {
      display: flex;
      gap: 8px;
    }

    .item-image {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .item-info {
      margin-bottom: 4px;

      h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
      }

      .restaurant {
        margin: 2px 0 0;
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
      }
    }

    .item-controls {
      display: flex;
      align-items: center;
      gap: 4px;

      .quantity {
        min-width: 20px;
        text-align: center;
        font-size: 14px;
      }

      .price {
        margin-left: auto;
        font-weight: 500;
        font-size: 14px;
      }
    }
      
    .total {
      margin: 8px 0;
      font-size: 16px;
      font-weight: 500;
      text-align: right;
    }
    
    .cart-actions {
      display: flex;
      gap: 8px;
      margin-top: 8px;

      button {
        flex: 1;
        font-size: 12px;
        padding: 0 8px;
      }
    }

    .empty-cart {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: rgba(0, 0, 0, 0.6);
      font-size: 16px;
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  get totalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.addToCart({ ...item, quantity: 1 });
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item, item.quantity - 1);
    } else {
      this.cartService.removeFromCart(item);
    }
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(CartDeleteDialogComponent, {
      width: '400px',
      panelClass: 'rounded-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clearCart();
      }
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
} 