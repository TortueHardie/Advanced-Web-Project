import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="confirmation-container">
      <mat-icon class="success-icon">check_circle</mat-icon>
      <h2>Commande confirmée</h2>
      <p>Votre commande a été reçue.</p>
      
      <div class="order-details">
        <div class="detail-row">
          <span>DATE:</span>
          <span>{{ orderDate | date:'longDate' }}</span>
        </div>
        <div class="detail-row">
          <span>TOTAL:</span>
          <span>{{ total }}€</span>
        </div>
        <div class="detail-row">
          <span>MÉTHODE DE PAIEMENT:</span>
          <span>Carte bancaire</span>
        </div>
      </div>

      <div class="actions">
        <button mat-raised-button color="primary" (click)="goToOrders()">
          Voir mes commandes
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirmation-container {
      max-width: 600px;
      margin: 48px auto;
      padding: 24px;
      text-align: center;
    }

    .success-icon {
      font-size: 64px;
      height: 64px;
      width: 64px;
      color: #4CAF50;
      margin-bottom: 24px;
    }

    h2 {
      margin-bottom: 16px;
      color: #333;
    }

    p {
      color: #666;
      margin-bottom: 32px;
    }

    .order-details {
      background: #f5f5f5;
      padding: 24px;
      border-radius: 4px;
      margin-bottom: 32px;
      text-align: left;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      span:first-child {
        color: #666;
        font-weight: 500;
      }
    }

    .actions {
      button {
        min-width: 200px;
      }
    }
  `]
})
export class OrderConfirmationComponent {
  orderDate = new Date();
  total = 22.00; // This would normally come from a service

  constructor(private router: Router) {}

  goToOrders() {
    this.router.navigate(['/commandes']);
  }
} 