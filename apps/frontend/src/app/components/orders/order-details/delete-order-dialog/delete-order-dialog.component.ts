import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-delete-order-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    template: `
        <div class="dialog-container">
            <h2 mat-dialog-title>Suppression de la commande</h2>
            <mat-dialog-content>
                <p>Êtes-vous sûr de vouloir supprimer votre commande ?</p>
            </mat-dialog-content>
            <mat-dialog-actions align="start">
                <button mat-button color="basic" (click)="onCancel()">ANNULER</button>
                <button mat-raised-button color="warn" (click)="onConfirm()">SUPPRIMER</button>
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
            }
        }
        mat-dialog-actions {
            margin: 0;
            padding: 0;
            gap: 16px;
        }
    `]
})
export class DeleteOrderDialogComponent {
    constructor(private dialogRef: MatDialogRef<DeleteOrderDialogComponent>) {}

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }
} 