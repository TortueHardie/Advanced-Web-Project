import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../../../models/order.model';
import { OrderService } from '../../../../services/order.service';

@Component({
    selector: 'app-modify-order-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    template: `
        <div class="dialog-container">
            <h2 mat-dialog-title>Modification de la commande</h2>
            <mat-dialog-content>
                <p>Êtes-vous sûr de vouloir modifier votre commande ?</p>
                <p class="info-text">Vos articles seront remis dans votre panier.</p>
            </mat-dialog-content>
            <mat-dialog-actions align="start">
                <button mat-button color="basic" (click)="onCancel()">ANNULER</button>
                <button mat-raised-button color="primary" (click)="onConfirm()">CONFIRMER</button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .dialog-container {
            padding: 32px;
            width: 480px;
            box-sizing: border-box;
        }
        h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 500;
        }
        mat-dialog-content {
            margin: 32px 0;
            p {
                font-size: 16px;
                margin: 0;
                
                &.info-text {
                    color: rgba(0, 0, 0, 0.6);
                    margin-top: 12px;
                    font-size: 14px;
                }
            }
        }
        mat-dialog-actions {
            margin: 0;
            padding: 0;
            gap: 16px;
        }
    `]
})
export class ModifyOrderDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<ModifyOrderDialogComponent>,
        private orderService: OrderService,
        @Inject(MAT_DIALOG_DATA) private data: { order: Order }
    ) {}

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onConfirm(): void {
        if (this.data.order) {
            this.orderService.moveOrderToCart(this.data.order).subscribe(success => {
                this.dialogRef.close(success);
            });
        } else {
            this.dialogRef.close(false);
        }
    }
} 