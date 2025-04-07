import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-view',
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule
    ],
    template: `
        <div class="order-view-container" *ngIf="order">
            <h1>Détails de la commande</h1>

            <div class="order-card">
                <div class="order-header">
                    <h2>ID de la commande : {{ order.id }}</h2>
                    <p class="date">{{ order.date | date:'dd/MM/yyyy HH:mm:ss' }}</p>
                </div>

                <div class="order-items">
                    <div class="item" *ngFor="let item of order.items">
                        <div class="item-details">
                            <span>{{ item.quantity }}x</span>
                            <span class="item-name">{{ item.name }}</span>
                        </div>
                        <span class="price">{{ item.price | currency:'EUR' }}</span>
                    </div>
                </div>

                <mat-divider></mat-divider>

                <div class="order-summary">
                    <div class="summary-row">
                        <div class="summary-label">
                            Vente de produits alimentaire<br>
                            (TVA comprise)
                        </div>
                        <div class="summary-value">{{ order.subtotal | currency:'EUR' }}</div>
                    </div>

                    <div class="summary-row">
                        <div class="summary-label">
                            Frais Pop-Eat ({{ order.fees.percentage }}% | TVA comprise)
                        </div>
                        <div class="summary-value">{{ order.fees.amount | currency:'EUR' }}</div>
                    </div>

                    <mat-divider></mat-divider>

                    <div class="summary-row total">
                        <div class="summary-label">Total</div>
                        <div class="summary-value">{{ order.total | currency:'EUR' }}</div>
                    </div>
                </div>

                <div class="order-status">
                    <h3>Statut de la commande</h3>
                    <div class="status-timeline">
                        <div class="status-item" *ngFor="let status of order.status">
                            <div class="status-time">{{ status.timestamp }}</div>
                            <div class="status-label">{{ status.status }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .order-view-container {
            padding: 24px;
            max-width: 800px;
            margin: 0 auto;
        }

        h1 {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 24px;
            color: rgba(0, 0, 0, 0.87);
        }

        .order-card {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 24px;
        }

        .order-header {
            margin-bottom: 24px;

            h2 {
                font-size: 18px;
                font-weight: 500;
                margin: 0;
                color: rgba(0, 0, 0, 0.87);
            }

            .date {
                margin: 8px 0 0;
                color: rgba(0, 0, 0, 0.6);
            }
        }

        .order-items {
            margin-bottom: 24px;

            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
                color: rgba(0, 0, 0, 0.87);

                .item-details {
                    display: flex;
                    gap: 12px;
                }

                .item-name {
                    font-weight: 500;
                }

                .price {
                    font-weight: 500;
                }
            }
        }

        .order-summary {
            margin: 24px 0;

            .summary-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 12px 0;
                color: rgba(0, 0, 0, 0.87);

                &.total {
                    font-weight: 600;
                    font-size: 18px;
                    margin-top: 16px;
                }
            }

            .summary-label {
                line-height: 1.5;
            }

            .summary-value {
                font-weight: 500;
            }
        }

        .order-status {
            margin-top: 24px;

            h3 {
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 16px;
                color: rgba(0, 0, 0, 0.87);
            }

            .status-timeline {
                .status-item {
                    display: flex;
                    gap: 24px;
                    margin-bottom: 12px;
                    color: rgba(0, 0, 0, 0.87);

                    .status-time {
                        min-width: 80px;
                        font-weight: 500;
                    }

                    .status-label {
                        color: rgba(0, 0, 0, 0.6);
                    }
                }
            }
        }

        mat-divider {
            margin: 24px 0;
        }
    `]
})
export class OrderViewComponent implements OnInit {
    order: Order | null = null;

    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        // In a real application, we would get the order ID from the route
        // and fetch the specific order. For now, we'll use the mock data.
        this.orderService.getCurrentOrder().subscribe(order => {
            this.order = order;
        });
    }
} 