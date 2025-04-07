import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { SearchService } from '../../../services/search.service';
import { NotificationService, Notification } from '../../../services/notification.service';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() menuClick = new EventEmitter<void>();
  @Output() cartClick = new EventEmitter<void>();
  searchTerm = '';
  cityTerm = '';
  notifications: Notification[] = [];
  totalCartItems = 0;
  private notificationSubscription: Subscription;
  private cartSubscription: Subscription;

  constructor(
    private searchService: SearchService,
    private notificationService: NotificationService,
    private cartService: CartService
  ) {
    this.notificationSubscription = this.notificationService.notifications$
      .subscribe(notifications => {
        this.notifications = notifications;
      });
    
    this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
      this.totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  ngOnInit(): void {
    this.notifications = this.notificationService.getNotifications();
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  get hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  get hasCartItems(): boolean {
    return this.totalCartItems > 0;
  }

  onSearchChange(term: string) {
    this.searchService.updateSearchTerm(term);
  }

  onCityChange(term: string) {
    this.searchService.updateCityTerm(term);
  }
}
