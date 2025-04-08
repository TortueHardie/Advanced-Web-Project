import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Restaurant, Menu, MenuItem } from '../../models/restaurant.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurateur-menu-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule
  ],
  template: `
    <div class="restaurant-management">
      <div class="header">
        <h1>Gestion des menus</h1>
        <button mat-raised-button color="primary" >+ MENU</button>
        <button mat-raised-button color="primary" >+ ARTICLE</button>
      </div>

      <mat-tab-group>
        <mat-tab label="Menus">
          <div class="menu-grid">
            @for (menu of restaurant.menus; track menu.id) {
              <mat-card class="menu-card">
                <img mat-card-image [src]="menu.image" [alt]="menu.name">
                <mat-card-content>
                  <h2>{{menu.name}}</h2>
                  <p class="price">{{menu.price | currency:'EUR':'symbol':'1.2-2'}}</p>
                  <p class="description">{{menu.description}}</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button color="primary" >MODIFIER</button>
                  <button mat-button color="warn" (click)="deleteMenu(menu)">SUPPRIMER</button>
                </mat-card-actions>
              </mat-card>
            }
          </div>
        </mat-tab>

        <mat-tab label="Articles">
          <div class="menu-grid">
            @for (item of restaurant.articles; track item.id) {
              <mat-card class="menu-card">
                <img mat-card-image [src]="item.image" [alt]="item.name">
                <mat-card-content>
                  <h2>{{item.name}}</h2>
                  <p class="price">{{item.price | currency:'EUR':'symbol':'1.2-2'}}</p>
                  <p class="description">{{item.description}}</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button color="primary">MODIFIER</button>
                  <button mat-button color="warn" (click)="deleteArticle(item)">SUPPRIMER</button>
                </mat-card-actions>
              </mat-card>
            }
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .restaurant-management {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .menu-card {
      max-width: 400px;
      margin: 0 auto;

      img {
        height: 200px;
        object-fit: cover;
      }

      mat-card-content {
        h2 {
          margin: 16px 0 8px;
          font-size: 1.2em;
        }

        .price {
          font-size: 1.1em;
          font-weight: bold;
          color: #1976d2;
        }

        .description {
          color: rgba(0, 0, 0, 0.6);
        }
      }

      mat-card-actions {
        display: flex;
        justify-content: space-between;
        padding: 8px 16px;
      }
    }
  `]
})
export class RestaurateurMenuManagementComponent implements OnInit {
  restaurant!: Restaurant;

  constructor(
    private dialog: MatDialog,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurant().subscribe(restaurant => {
      this.restaurant = restaurant;
    });
  }

  deleteMenu(menu: Menu): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Supprimer le menu',
        message: `Êtes-vous sûr de vouloir supprimer le menu "${menu.name}" ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurantService.deleteMenu(menu.id);
      }
    });
  }

  deleteArticle(item: MenuItem): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Supprimer l\'article',
        message: `Êtes-vous sûr de vouloir supprimer l'article "${item.name}" ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurantService.deleteArticle(item.id);
      }
    });
  }
} 