import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
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
    MatInputModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="item-update">
      <div class="dialog-header">
        <h2>Edition article</h2>
        <button mat-icon-button (click)="onCancel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      
      <mat-divider></mat-divider>
      
      <form #itemForm="ngForm" class="dialog-content">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput placeholder="ex : Classic Burger" 
                 [(ngModel)]="item.name" name="name" required>
          <mat-icon matSuffix>restaurant_menu</mat-icon>
        </mat-form-field>

        <div class="photo-upload">
          <label>Photo</label>
          <div class="upload-container">
            <button mat-raised-button color="primary">
              <mat-icon>upload</mat-icon>
              PARCOURIR LES FICHIERS
            </button>
            @if (item.image) {
              <div class="image-preview">
                <img [src]="item.image" [alt]="item.name">
                <button mat-icon-button color="warn" class="remove-image">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            }
          </div>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description (optionnelle)</mat-label>
          <textarea matInput placeholder="ex : Pain, salade, tomate, oignon..."
                    [(ngModel)]="item.description" name="description"
                    rows="3"></textarea>
          <mat-icon matSuffix>description</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Prix</mat-label>
          <input matInput type="number" placeholder="ex : 8.00 €"
                 [(ngModel)]="item.price" name="price" required
                 min="0" step="0.50">
          <mat-icon matSuffix>euro</mat-icon>
        </mat-form-field>
      </form>
      
      <mat-divider></mat-divider>

      <div class="dialog-actions">
        <button mat-button (click)="onCancel()">ANNULER</button>
        <button mat-raised-button color="primary" 
                (click)="onSave()" [disabled]="!itemForm.valid">
          SAUVEGARDER
        </button>
      </div>
    </div>
  `,
  styles: [`
    .item-update {
      display: flex;
      flex-direction: column;
      max-height: 90vh;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;

      h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
      }
    }

    .dialog-content {
      padding: 24px;
      overflow-y: auto;
    }

    .full-width {
      width: 100%;
    }

    .photo-upload {
      margin: 16px 0 24px;
      
      label {
        display: block;
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
      }

      .upload-container {
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }

      .image-preview {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 4px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-image {
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(0, 0, 0, 0.5);
          
          &:hover {
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 24px;
      background: #fafafa;
    }

    mat-form-field {
      margin-bottom: 16px;
    }

    textarea {
      min-height: 80px;
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