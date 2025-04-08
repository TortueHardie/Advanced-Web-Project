import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-commercial-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule
  ],
  template: `
    <div class="orders-container">
      <div class="header">
        <h1>Commandes</h1>
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Rechercher une commande</mat-label>
          <input matInput placeholder="Rechercher...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <!-- Order Details Section -->
      <div class="order-details-container" *ngIf="selectedOrder">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Détails de la commande #{{ selectedOrder.id }}</mat-card-title>
            <mat-card-subtitle>{{ selectedOrder.date | date:'dd/MM/yyyy HH:mm:ss' }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="order-info">
              <p><strong>Articles:</strong> {{ getOrderItems(selectedOrder) }}</p>
              <p><strong>Statut:</strong> {{ getOrderStatus(selectedOrder) }}</p>
              <p><strong>Montant:</strong> {{ selectedOrder.total | currency:'EUR' }}</p>
            </div>
            
            <mat-divider></mat-divider>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-raised-button (click)="hideOrderDetails()">FERMER</button>
          </mat-card-actions>
        </mat-card>
      </div>

      <table mat-table [dataSource]="orders" class="mat-elevation-z2 orders-table">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let order">{{ order.id }}</td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date & Heure</th>
          <td mat-cell *matCellDef="let order">{{ order.date | date:'dd/MM/yyyy HH:mm:ss' }}</td>
        </ng-container>

        <ng-container matColumnDef="articles">
          <th mat-header-cell *matHeaderCellDef>Articles</th>
          <td mat-cell *matCellDef="let order">{{ getOrderItems(order) }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Statut</th>
          <td mat-cell *matCellDef="let order">{{ getOrderStatus(order) }}</td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let order">
            <button mat-raised-button color="primary" (click)="showOrderDetails(order)">DÉTAILS</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    h1 {
      color: #3f51b5;
      font-weight: 500;
      margin: 0;
    }

    .search-field {
      width: 300px;
    }

    .orders-table {
      width: 100%;
      margin-bottom: 30px;
    }

    th.mat-header-cell {
      font-weight: bold;
      color: rgba(0, 0, 0, 0.87);
      background-color: #f5f5f5;
    }

    .mat-column-id {
      width: 7%;
    }

    .mat-column-date {
      width: 20%;
    }

    .mat-column-articles {
      width: 30%;
    }

    .mat-column-status {
      width: 18%;
    }

    .mat-column-action {
      width: 25%;
      text-align: right;
    }

    .mat-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .order-details-container {
      margin-bottom: 20px;
    }
    
    mat-card {
      padding: 16px;
    }
    
    mat-card-title {
      color: #3f51b5;
      font-size: 1.5rem;
    }
    
    .order-info {
      margin: 16px 0;
    }
    
    mat-card-actions {
      display: flex;
      gap: 8px;
      padding: 16px;
    }
  `]
})
export class CommercialOrdersComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  displayedColumns: string[] = ['id', 'date', 'articles', 'status', 'action'];

  constructor() {}

  ngOnInit(): void {
    // Initialize with mock data
    this.loadOrders();
  }

  loadOrders(): void {
    // Mock data matching the mockup
    this.orders = [
      {
        id: '1',
        date: new Date('2025-03-19T15:05:13'),
        items: [{ quantity: 1, name: 'Classic Burger Menu', price: 15.99, image: '' }],
        subtotal: 15.99,
        fees: { amount: 2.99, percentage: 10 },
        total: 18.98,
        status: [{ timestamp: new Date().toISOString(), status: 'Livraison en cours' }]
      },
      {
        id: '2',
        date: new Date('2025-03-19T15:05:13'),
        items: [{ quantity: 1, name: 'Frites', price: 3.99, image: '' }],
        subtotal: 3.99,
        fees: { amount: 2.99, percentage: 10 },
        total: 6.98,
        status: [{ timestamp: new Date().toISOString(), status: 'Livraison en cours' }]
      },
      {
        id: '3',
        date: new Date('2025-03-19T15:05:13'),
        items: [{ quantity: 1, name: 'Classic Burger', price: 12.99, image: '' }],
        subtotal: 12.99,
        fees: { amount: 2.99, percentage: 10 },
        total: 15.98,
        status: [{ timestamp: new Date().toISOString(), status: 'En attente de réception' }]
      },
      {
        id: '4',
        date: new Date('2025-03-19T15:05:13'),
        items: [{ quantity: 1, name: 'Classic Burger Menu', price: 15.99, image: '' }],
        subtotal: 15.99,
        fees: { amount: 2.99, percentage: 10 },
        total: 18.98,
        status: [{ timestamp: new Date().toISOString(), status: 'En attente de réception' }]
      },
      {
        id: '5',
        date: new Date('2025-03-19T15:05:13'),
        items: [{ quantity: 1, name: 'Frites', price: 3.99, image: '' }],
        subtotal: 3.99,
        fees: { amount: 2.99, percentage: 10 },
        total: 6.98,
        status: [{ timestamp: new Date().toISOString(), status: 'Préparation en cours' }]
      }
    ];
  }

  getOrderItems(order: Order): string {
    return order.items.map(item => `${item.name}`).join(', ');
  }

  getOrderStatus(order: Order): string {
    return order.status[order.status.length - 1].status;
  }

  showOrderDetails(order: Order): void {
    this.selectedOrder = order;
  }

  hideOrderDetails(): void {
    this.selectedOrder = null;
  }
} 