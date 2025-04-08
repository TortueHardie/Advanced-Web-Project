import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="delete-dialog">
      <h2 mat-dialog-title>Suppression du compte</h2>
      <mat-dialog-content>
        <p>Êtes-vous sûr de vouloir supprimer ce compte ?</p>
      </mat-dialog-content>
      <mat-dialog-actions align="center">
        <button mat-raised-button color="warn" (click)="confirm()">SUPPRIMER</button>
        <button mat-raised-button (click)="cancel()">ANNULER</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .delete-dialog {
      padding: 20px;
      text-align: center;
    }

    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }

    p {
      margin: 20px 0;
      font-size: 16px;
    }

    mat-dialog-actions {
      justify-content: center;
      gap: 16px;
      padding: 20px 0 0;
    }

    button {
      min-width: 120px;
    }
  `]
})
export class DeleteUserDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteUserDialogComponent>) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
} 