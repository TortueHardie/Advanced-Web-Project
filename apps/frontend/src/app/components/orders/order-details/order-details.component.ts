import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';
import { DeleteOrderDialogComponent } from './delete-order-dialog/delete-order-dialog.component';
import { ModifyOrderDialogComponent } from './modify-order-dialog/modify-order-dialog.component';

@Component({
    selector: 'app-order-details',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatDialogModule
    ],
    template: `
        <mat-card *ngIf="currentOrder" class="order-card">
            <mat-card-header>
                <mat-card-title>Commande en cours</mat-card-title>
                <mat-card-subtitle>
                    ID de la commande : {{ currentOrder.id }}
                    <br>
                    {{ currentOrder.date | date:'dd/MM/yyyy HH:mm:ss' }}
                </mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
                <mat-list>
                    <mat-list-item *ngFor="let item of currentOrder.items">
                        {{ item.quantity }}x {{ item.name }}
                        <span class="price">{{ item.price | currency:'EUR' }}</span>
                    </mat-list-item>
                </mat-list>

                <mat-divider></mat-divider>

                <div class="total-section">
                    <p>Vente de produits alimentaire (TVA comprise)
                        <span class="price">{{ currentOrder.subtotal | currency:'EUR' }}</span>
                    </p>
                    <p>Frais Pop-Eat ({{ currentOrder.fees.percentage }}% | TVA comprise)
                        <span class="price">{{ currentOrder.fees.amount | currency:'EUR' }}</span>
                    </p>
                    <p class="total">Total
                        <span class="price">{{ currentOrder.total | currency:'EUR' }}</span>
                    </p>
                </div>

                <mat-divider></mat-divider>

                <div class="status-section">
                    <h3>Statut de la commande</h3>
                    <div *ngFor="let status of currentOrder.status">
                        <p>{{ status.timestamp }} - {{ status.status }}</p>
                    </div>
                </div>
            </mat-card-content>

            <mat-card-actions>
                <button mat-raised-button color="primary" (click)="onModify()">MODIFIER</button>
                <button mat-raised-button color="warn" (click)="onDelete()">SUPPRIMER</button>
            </mat-card-actions>
        </mat-card>

        <mat-card *ngIf="!currentOrder" class="no-order-card">
            <mat-card-content>
                <p>Aucune commande en cours</p>
            </mat-card-content>
        </mat-card>
    `,
    styles: [`
        .order-card, .no-order-card {
            max-width: 800px;
            margin: 20px auto;
        }
        .no-order-card {
            text-align: center;
            padding: 20px;
        }
        .no-order-card p {
            font-size: 1.2em;
            color: #666;
        }
        .price {
            float: right;
            font-weight: bold;
        }
        .total-section {
            margin: 20px 0;
            p {
                display: flex;
                justify-content: space-between;
                margin: 8px 0;
            }
            .total {
                font-weight: bold;
                font-size: 1.1em;
            }
        }
        .status-section {
            margin: 20px 0;
        }
        mat-card-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            padding: 16px;
        }
    `]
})
export class OrderDetailsComponent implements OnInit {
    currentOrder: Order | null = null;

    constructor(
        private orderService: OrderService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.loadOrder();
    }

    loadOrder() {
        this.orderService.getCurrentOrder().subscribe(order => {
            this.currentOrder = order;
        });
    }

    onModify() {
        const dialogRef = this.dialog.open(ModifyOrderDialogComponent, {
            width: '480px',
            disableClose: true,
            panelClass: 'order-dialog',
            data: { order: this.currentOrder }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.currentOrder = null;
            }
        });
    }

    onDelete() {
        const dialogRef = this.dialog.open(DeleteOrderDialogComponent, {
            width: '480px',
            disableClose: true,
            panelClass: 'order-dialog'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && this.currentOrder) {
                this.orderService.deleteOrder(this.currentOrder.id).subscribe(success => {
                    if (success) {
                        this.currentOrder = null;
                    }
                });
            }
        });
    }
} 