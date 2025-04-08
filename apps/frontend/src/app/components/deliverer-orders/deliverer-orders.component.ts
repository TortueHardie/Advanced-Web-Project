import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Order } from '../../models/order.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-deliverer-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule
  ],
  template: `
    <div class="orders-container">
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
            <button mat-raised-button color="warn" *ngIf="isDeliveryInProgress(selectedOrder)" (click)="cancelDelivery(selectedOrder)">ANNULER</button>
            <button mat-raised-button color="accent" *ngIf="isDeliveryInProgress(selectedOrder)" (click)="markAsDelivered(selectedOrder)">MARQUER COMME LIVRÉ</button>
            <button mat-raised-button (click)="hideOrderDetails()">FERMER</button>
          </mat-card-actions>
        </mat-card>
      </div>

      <h1>Livraisons en cours</h1>
      
      <table mat-table [dataSource]="currentDeliveries" class="mat-elevation-z2 orders-table">
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

      <h2>Proposition de livraison</h2>
      
      <table mat-table [dataSource]="proposedDeliveries" class="mat-elevation-z2 orders-table">
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
          <td mat-cell *matCellDef="let order">En attente</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let order">
            <button mat-raised-button color="accent" class="accept-btn" (click)="acceptDelivery(order)">ACCEPTER</button>
            <button mat-raised-button color="primary" class="details-btn" (click)="showOrderDetails(order)">DÉTAILS</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="proposedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: proposedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1, h2 {
      color: #3f51b5;
      font-weight: 500;
      margin-bottom: 20px;
    }

    h2 {
      margin-top: 40px;
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

    .accept-btn {
      margin-right: 8px;
      background-color: #4caf50;
      color: white;
    }

    .details-btn {
      background-color: #3f51b5;
      color: white;
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

    .mat-column-actions, .mat-column-action {
      width: 25%;
      text-align: right;
    }

    .mat-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .order-details-container {
      margin: 20px 0 40px;
      background-color: #f8f9fa;
      border-radius: 8px;
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
    
    button {
      margin-right: 8px;
    }
  `]
})
export class DelivererOrdersComponent implements OnInit {
  currentDeliveries: Order[] = [];
  proposedDeliveries: Order[] = [];
  selectedOrder: Order | null = null;
  displayedColumns: string[] = ['id', 'date', 'articles', 'status', 'action'];
  proposedColumns: string[] = ['id', 'date', 'articles', 'status', 'actions'];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Mock data would be loaded here
    this.loadCurrentDeliveries();
    this.loadProposedDeliveries();
  }

  loadCurrentDeliveries(): void {
    // Mock data
    this.currentDeliveries = [
      {
        id: '1',
        date: new Date('2025-03-21T08:50:46'),
        items: [{ quantity: 1, name: 'Classic Burger Menu', price: 15.99, image: '' }],
        subtotal: 15.99,
        fees: { amount: 2.99, percentage: 10 },
        total: 18.98,
        status: [{ timestamp: new Date().toISOString(), status: 'Livraison en cours' }]
      },
      {
        id: '2',
        date: new Date('2025-03-21T08:50:46'),
        items: [{ quantity: 1, name: 'Frites', price: 3.99, image: '' }],
        subtotal: 3.99,
        fees: { amount: 2.99, percentage: 10 },
        total: 6.98,
        status: [{ timestamp: new Date().toISOString(), status: 'Livraison en cours' }]
      }
    ];
  }

  loadProposedDeliveries(): void {
    // Mock data
    this.proposedDeliveries = [
      {
        id: '6',
        date: new Date('2025-03-21T08:50:46'),
        items: [{ quantity: 1, name: 'Classic Burger', price: 12.99, image: '' }],
        subtotal: 12.99,
        fees: { amount: 2.99, percentage: 10 },
        total: 15.98,
        status: [{ timestamp: new Date().toISOString(), status: 'En attente' }]
      },
      {
        id: '7',
        date: new Date('2025-03-21T08:50:46'),
        items: [{ quantity: 1, name: 'Classic Burger Menu', price: 15.99, image: '' }],
        subtotal: 15.99,
        fees: { amount: 2.99, percentage: 10 },
        total: 18.98,
        status: [{ timestamp: new Date().toISOString(), status: 'En attente' }]
      }
    ];
  }

  getOrderItems(order: Order): string {
    return order.items.map(item => `${item.quantity}x ${item.name}`).join(', ');
  }

  getOrderStatus(order: Order): string {
    return order.status[order.status.length - 1].status;
  }

  isDeliveryInProgress(order: Order): boolean {
    return this.getOrderStatus(order) === 'Livraison en cours';
  }

  showOrderDetails(order: Order): void {
    this.selectedOrder = order;
  }

  hideOrderDetails(): void {
    this.selectedOrder = null;
  }

  acceptDelivery(order: Order): void {
    // In a real application, this would make an API call
    order.status.push({ timestamp: new Date().toISOString(), status: 'Livraison en cours' });
    this.currentDeliveries = [...this.currentDeliveries, order];
    this.proposedDeliveries = this.proposedDeliveries.filter(o => o.id !== order.id);
  }

  cancelDelivery(order: Order): void {
    // In a real application, this would make an API call
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Annuler la livraison',
        message: 'Êtes-vous sûr de vouloir annuler cette livraison ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentDeliveries = this.currentDeliveries.filter(o => o.id !== order.id);
        this.hideOrderDetails();
      }
    });
  }

  markAsDelivered(order: Order): void {
    // In a real application, this would make an API call
    order.status.push({ timestamp: new Date().toISOString(), status: 'Livré' });
    this.currentDeliveries = this.currentDeliveries.filter(o => o.id !== order.id);
    this.hideOrderDetails();
  }
} 