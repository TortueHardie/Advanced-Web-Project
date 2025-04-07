import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';
import { RestaurateurOrdersService } from '../../services/restaurateur-orders.service';
import { RestaurateurOrder } from '../../models/restaurateur-order.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-restaurateur-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatDividerModule
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
              <p><strong>Articles:</strong> {{ selectedOrder.articles }}</p>
              <p><strong>Statut:</strong> {{ selectedOrder.status }}</p>
              <p *ngIf="selectedOrder.amount"><strong>Montant:</strong> {{ selectedOrder.amount | currency:'EUR' }}</p>
            </div>
            
            <mat-divider></mat-divider>
            
            <div class="order-actions">
              <h3>Actions disponibles</h3>
              <p>Selon le statut de la commande, différentes actions peuvent être effectuées.</p>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-raised-button color="primary" *ngIf="selectedOrder.status === 'En attente'" (click)="validateOrder(selectedOrder)">VALIDER</button>
            <button mat-raised-button color="warn" *ngIf="['En attente', 'Préparation en cours'].includes(selectedOrder.status)" (click)="cancelOrder()">ANNULER</button>
            <button mat-raised-button color="accent" *ngIf="selectedOrder.status === 'Préparation en cours'" (click)="markAsReady()">MARQUER COMME PRÊT</button>
            <button mat-raised-button (click)="hideOrderDetails()">FERMER</button>
          </mat-card-actions>
        </mat-card>
      </div>
      
      <h1>Commandes en cours</h1>
      
      <table mat-table [dataSource]="currentOrders" class="mat-elevation-z2 orders-table">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let order">{{ order.id }}</td>
        </ng-container>

        <!-- Date Column -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date & Heure</th>
          <td mat-cell *matCellDef="let order">{{ order.date | date:'dd/MM/yyyy HH:mm:ss' }}</td>
        </ng-container>

        <!-- Articles Column -->
        <ng-container matColumnDef="articles">
          <th mat-header-cell *matHeaderCellDef>Articles</th>
          <td mat-cell *matCellDef="let order">{{ order.articles }}</td>
        </ng-container>

        <!-- Status Column -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Statut</th>
          <td mat-cell *matCellDef="let order">{{ order.status }}</td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let order">
            <button mat-raised-button color="primary" class="validate-btn" (click)="validateOrder(order)" *ngIf="order.status === 'En attente'">VALIDER</button>
            <button mat-raised-button color="primary" class="details-btn" (click)="showOrderDetails(order)">DÉTAILS</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>



      <h2>Historique</h2>
      
      <table mat-table [dataSource]="orderHistory" class="mat-elevation-z2 history-table">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let order">{{ order.id }}</td>
        </ng-container>

        <!-- Date Column -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date & Heure</th>
          <td mat-cell *matCellDef="let order">{{ order.date | date:'dd/MM/yyyy HH:mm:ss' }}</td>
        </ng-container>

        <!-- Articles Column -->
        <ng-container matColumnDef="articles">
          <th mat-header-cell *matHeaderCellDef>Articles</th>
          <td mat-cell *matCellDef="let order">{{ order.articles }}</td>
        </ng-container>

        <!-- Amount Column -->
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Montant</th>
          <td mat-cell *matCellDef="let order">{{ order.amount | currency:'EUR' }}</td>
        </ng-container>

        <!-- Action Column -->
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let order">
            <button mat-raised-button color="primary" class="details-btn" (click)="showOrderDetails(order)">DÉTAILS</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="historyDisplayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: historyDisplayedColumns;"></tr>
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

    .orders-table, .history-table {
      width: 100%;
      margin-bottom: 30px;
    }

    th.mat-header-cell {
      font-weight: bold;
      color: rgba(0, 0, 0, 0.87);
      background-color: #f5f5f5;
    }

    .validate-btn {
      margin-right: 8px;
      background-color: #4caf50;
    }

    .details-btn {
      background-color: #3f51b5;
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

    .mat-column-status, .mat-column-amount {
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
    
    .order-actions {
      margin-top: 16px;
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
export class RestaurateurOrdersComponent implements OnInit {
  currentOrders: RestaurateurOrder[] = [];
  orderHistory: RestaurateurOrder[] = [];
  selectedOrder: RestaurateurOrder | null = null;
  displayedColumns: string[] = ['id', 'date', 'articles', 'status', 'actions'];
  historyDisplayedColumns: string[] = ['id', 'date', 'articles', 'amount', 'action'];

  constructor(
    private restaurateurOrdersService: RestaurateurOrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentOrders();
    this.loadOrderHistory();
  }

  loadCurrentOrders(): void {
    this.restaurateurOrdersService.getCurrentOrders().subscribe(orders => {
      this.currentOrders = orders;
    });
  }

  loadOrderHistory(): void {
    this.restaurateurOrdersService.getOrderHistory().subscribe(history => {
      this.orderHistory = history;
    });
  }

  validateOrder(order: RestaurateurOrder): void {
    this.restaurateurOrdersService.validateOrder(order.id).subscribe(() => {
      this.loadCurrentOrders();
      if (this.selectedOrder && this.selectedOrder.id === order.id) {
        // Refresh selected order details if currently selected
        this.showOrderDetails(order);
      }
    });
  }

  showOrderDetails(order: RestaurateurOrder): void {
    this.selectedOrder = order;
  }

  hideOrderDetails(): void {
    this.selectedOrder = null;
  }

  cancelOrder(): void {
    console.log('Order cancelled');
    // Implementation would go here
  }
  
  markAsReady(): void {
    if (this.selectedOrder) {
      this.restaurateurOrdersService.markAsReady(this.selectedOrder.id).subscribe(() => {
        this.loadCurrentOrders();
        // Refresh selected order details
        const updatedOrder = this.currentOrders.find(order => order.id === this.selectedOrder?.id);
        if (updatedOrder) {
          this.showOrderDetails(updatedOrder);
        }
      });
    }
  }
} 