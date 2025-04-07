import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { OrderHistory } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';

@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        RouterModule
    ],
    template: `
        <div class="history-container">
            <h2>Historique</h2>
            <table mat-table [dataSource]="orderHistory" class="mat-elevation-z8">
                <ng-container matColumnDef="id">
                    <th mat-header-cell *matHeaderCellDef>ID</th>
                    <td mat-cell *matCellDef="let order">{{ order.id }}</td>
                </ng-container>

                <ng-container matColumnDef="dateTime">
                    <th mat-header-cell *matHeaderCellDef>Date & Heure</th>
                    <td mat-cell *matCellDef="let order">{{ order.dateTime | date:'dd/MM/yyyy HH:mm:ss' }}</td>
                </ng-container>

                <ng-container matColumnDef="amount">
                    <th mat-header-cell *matHeaderCellDef>Montant</th>
                    <td mat-cell *matCellDef="let order">{{ order.amount | currency:'EUR' }}</td>
                </ng-container>

                <ng-container matColumnDef="paymentType">
                    <th mat-header-cell *matHeaderCellDef>Type de paiement</th>
                    <td mat-cell *matCellDef="let order">{{ order.paymentType }}</td>
                </ng-container>

                <ng-container matColumnDef="action">
                    <th mat-header-cell *matHeaderCellDef>Action</th>
                    <td mat-cell *matCellDef="let order">
                        <a mat-raised-button color="primary" [routerLink]="['/commandes', order.id]">DÉTAILS</a>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
        </div>
    `,
    styles: [`
        .history-container {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        table {
            width: 100%;
        }
        th.mat-header-cell {
            font-weight: bold;
            color: rgba(0, 0, 0, 0.87);
        }
        .mat-column-action {
            width: 100px;
            text-align: center;
        }
        button {
            margin: 4px;
        }
    `]
})
export class OrderHistoryComponent implements OnInit {
    orderHistory: OrderHistory[] = [];
    displayedColumns: string[] = ['id', 'dateTime', 'amount', 'paymentType', 'action'];

    constructor(private orderService: OrderService) {}

    ngOnInit() {
        this.loadOrderHistory();
    }

    loadOrderHistory() {
        this.orderService.getOrderHistory().subscribe(history => {
            this.orderHistory = history;
        });
    }
} 