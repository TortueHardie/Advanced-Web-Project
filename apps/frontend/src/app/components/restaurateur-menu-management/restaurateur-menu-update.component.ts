import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    MatCheckboxModule
  ],
  template: `
    <div class="menu-update">
      <h2>Edition menu</h2>
      
      <form #menuForm="ngForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput placeholder="ex : Classic Burger Menu" 
                 [(ngModel)]="menu.name" name="name" required>
        </mat-form-field>

        <div class="photo-upload">
          <label>Photo</label>
          <button mat-raised-button color="primary">PARCOURIR LES FICHIERS</button>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description (optionnelle)</mat-label>
          <textarea matInput placeholder="ex : Pain, salade, tomate, oignon..."
                    [(ngModel)]="menu.description" name="description"></textarea>
        </mat-form-field>

        <div class="articles-section">
          <h3>Articles</h3>
          <div class="article-list">
            @for (item of availableItems; track item.id) {
              <mat-checkbox [(ngModel)]="item.selected" 
                          [name]="'item-' + item.id">
                {{ item.name }}
              </mat-checkbox>
            }
          </div>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Prix</mat-label>
          <input matInput type="number" placeholder="ex : 12.00 €"
                 [(ngModel)]="menu.price" name="price" required>
          <span matSuffix>€</span>
        </mat-form-field>

        <div class="actions">
          <button mat-button (click)="onCancel()">ANNULER</button>
          <button mat-raised-button color="primary" 
                  (click)="onSave()" [disabled]="!menuForm.valid">
            SAUVEGARDER
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .menu-update {
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

    .articles-section {
      margin: 24px 0;
      
      h3 {
        margin-bottom: 16px;
      }
    }

    .article-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
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