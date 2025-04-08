import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Menu, MenuItem } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurateur-menu-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="menu-update">
      <div class="dialog-header">
        <h2>Edition menu</h2>
        <button mat-icon-button (click)="onCancel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      
      <mat-divider></mat-divider>
      
      <form #menuForm="ngForm" class="dialog-content">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput placeholder="ex : Classic Burger Menu" 
                 [(ngModel)]="menu.name" name="name" required>
          <mat-icon matSuffix>fastfood</mat-icon>
        </mat-form-field>

        <div class="photo-upload">
          <label>Photo</label>
          <div class="upload-container">
            <button mat-raised-button color="primary">
              <mat-icon>upload</mat-icon>
              PARCOURIR LES FICHIERS
            </button>
            @if (menu.image) {
              <div class="image-preview">
                <img [src]="menu.image" [alt]="menu.name">
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
                    [(ngModel)]="menu.description" name="description"
                    rows="3"></textarea>
          <mat-icon matSuffix>description</mat-icon>
        </mat-form-field>

        <div class="articles-section">
          <h3>Articles</h3>
          <div class="article-list">
            @for (item of availableItems; track item.id) {
              <mat-checkbox [(ngModel)]="item.selected" 
                          [name]="'item-' + item.id"
                          color="primary"
                          class="article-checkbox">
                <div class="article-info">
                  <span class="article-name">{{ item.name }}</span>
                  <span class="article-price">{{ item.price }}€</span>
                </div>
              </mat-checkbox>
            }
          </div>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Prix</mat-label>
          <input matInput type="number" placeholder="ex : 12.00 €"
                 [(ngModel)]="menu.price" name="price" required
                 min="0" step="0.50">
          <mat-icon matSuffix>euro</mat-icon>
        </mat-form-field>
      </form>
      
      <mat-divider></mat-divider>

      <div class="dialog-actions">
        <button mat-button (click)="onCancel()">ANNULER</button>
        <button mat-raised-button color="primary" 
                (click)="onSave()" [disabled]="!menuForm.valid">
          SAUVEGARDER
        </button>
      </div>
    </div>
  `,
  styles: [`
    .menu-update {
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

    .articles-section {
      margin: 24px 0;
      
      h3 {
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
      }
    }

    .article-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
    }

    .article-checkbox {
      ::ng-deep .mdc-form-field {
        width: 100%;
      }
    }

    .article-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-left: 8px;
    }

    .article-name {
      font-weight: 500;
    }

    .article-price {
      color: #1976d2;
      font-weight: 500;
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
export class RestaurateurMenuUpdateComponent implements OnInit {
  menu: Partial<Menu> = {};
  availableItems: (MenuItem & { selected?: boolean })[] = [];

  constructor(
    private dialogRef: MatDialogRef<RestaurateurMenuUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { menu?: Menu }
  ) {}

  ngOnInit(): void {
    if (this.data.menu) {
      this.menu = { ...this.data.menu };
    }
    // Mock data for available items
    this.availableItems = [
      { id: '1', name: 'Classic Burger', price: 8.00, selected: true },
      { id: '2', name: 'Frites', price: 3.00, selected: true },
      { id: '3', name: 'Coca', price: 2.50, selected: true },
      { id: '4', name: 'Glace', price: 3.50, selected: false }
    ];
  }

  onSave(): void {
    const selectedItems = this.availableItems
      .filter(item => item.selected)
      .map(({ selected, ...item }) => item);
    
    const menuData = {
      ...this.menu,
      items: selectedItems
    };
    
    this.dialogRef.close(menuData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 