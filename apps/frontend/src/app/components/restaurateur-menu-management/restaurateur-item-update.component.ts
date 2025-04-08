import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MenuItem } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurateur-item-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="item-update">
      <h2>Edition article</h2>
      
      <form #itemForm="ngForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput placeholder="ex : Classic Burger" 
                 [(ngModel)]="item.name" name="name" required>
        </mat-form-field>

        <div class="photo-upload">
          <label>Photo</label>
          <button mat-raised-button color="primary">PARCOURIR LES FICHIERS</button>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description (optionnelle)</mat-label>
          <textarea matInput placeholder="ex : Pain, salade, tomate, oignon..."
                    [(ngModel)]="item.description" name="description"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Prix</mat-label>
          <input matInput type="number" placeholder="ex : 8.00 €"
                 [(ngModel)]="item.price" name="price" required>
          <span matSuffix>€</span>
        </mat-form-field>

        <div class="actions">
          <button mat-button (click)="onCancel()">ANNULER</button>
          <button mat-raised-button color="primary" 
                  (click)="onSave()" [disabled]="!itemForm.valid">
            SAUVEGARDER
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .item-update {
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
    }

    .full-width {
      width: 100%;
    }

    .photo-upload {
      margin: 16px 0;
      
      label {
        display: block;
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.6);
      }
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }
  `]
})
export class RestaurateurItemUpdateComponent implements OnInit {
  item: Partial<MenuItem> = {};

  constructor(
    private dialogRef: MatDialogRef<RestaurateurItemUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item?: MenuItem }
  ) {}

  ngOnInit(): void {
    if (this.data.item) {
      this.item = { ...this.data.item };
    }
  }

  onSave(): void {
    this.dialogRef.close(this.item);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 