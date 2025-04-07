import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurateurOrdersService } from '../../../services/restaurateur-orders.service';
import { RestaurateurOrder } from '../../../models/restaurateur-order.model';

@Component({
  selector: 'app-restaurateur-order-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ],
  template: `
    <div class="order-details-container" *ngIf="order">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Détails de la commande #{{ order.id }}</mat-card-title>
          <mat-card-subtitle>{{ order.date | date:'dd/MM/yyyy HH:mm:ss' }}</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="order-info">
            <p><strong>Articles:</strong> {{ order.articles }}</p>
            <p><strong>Statut:</strong> {{ order.status }}</p>
            <p *ngIf="order.amount"><strong>Montant:</strong> {{ order.amount | currency:'EUR' }}</p>
          </div>
          
          <mat-divider></mat-divider>
          
          <div class="order-actions">
            <h3>Actions disponibles</h3>
            <p>Selon le statut de la commande, différentes actions peuvent être effectuées.</p>
          </div>
        </mat-card-content>
        
        <mat-card-actions>
          <button mat-raised-button color="primary" *ngIf="order.status === 'En attente'" (click)="validateOrder()">VALIDER</button>
          <button mat-raised-button color="warn" *ngIf="['En attente', 'Préparation en cours'].includes(order.status)" (click)="cancelOrder()">ANNULER</button>
          <button mat-raised-button color="accent" *ngIf="order.status === 'Préparation en cours'" (click)="markAsReady()">MARQUER COMME PRÊT</button>
          <button mat-raised-button (click)="goBack()">RETOUR</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .order-details-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
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
export class RestaurateurOrderDetailsComponent implements OnInit {
  order: RestaurateurOrder | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurateurOrdersService: RestaurateurOrdersService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadOrder(id);
      }
    });
  }
  
  loadOrder(id: number): void {
    this.restaurateurOrdersService.getCurrentOrders().subscribe(orders => {
      this.order = orders.find(o => o.id === id) || null;
      
      if (!this.order) {
        this.restaurateurOrdersService.getOrderHistory().subscribe(history => {
          this.order = history.find(o => o.id === id) || null;
        });
      }
    });
  }
  
  validateOrder(): void {
    if (this.order) {
      this.restaurateurOrdersService.validateOrder(this.order.id).subscribe(() => {
        this.loadOrder(this.order!.id);
      });
    }
  }
  
  cancelOrder(): void {
    console.log('Order cancelled');
    // Implementation would go here
  }
  
  markAsReady(): void {
    console.log('Order marked as ready');
    // Implementation would go here
  }
  
  goBack(): void {
    this.router.navigate(['/restaurateur/commandes']);
  }
} 