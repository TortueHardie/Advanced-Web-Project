import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [
        CommonModule,
        OrderDetailsComponent,
        OrderHistoryComponent
    ],
    template: `
        <div class="orders-container">
            <app-order-details></app-order-details>
            <app-order-history></app-order-history>
        </div>
    `,
    styles: [`
        .orders-container {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
    `]
})
export class OrdersComponent {} 