import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Suppression du composant</h2>
    <div mat-dialog-content>
      <p>Êtes-vous sûr de vouloir supprimer ce composant ?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button color="warn" (click)="onConfirm()">SUPPRIMER</button>
      <button mat-button (click)="onCancel()">ANNULER</button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 20px;
    }
    .mat-dialog-actions {
      justify-content: flex-end;
      gap: 8px;
    }
  `]
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
} 