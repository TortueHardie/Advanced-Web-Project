import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="checkout-container">
      <h2>Paiement</h2>
      
      <div class="order-summary">
        <h3>Récapitulatif de la commande</h3>
        <div class="summary-item" *ngFor="let item of cartItems">
          <span>{{ item.name }} x {{ item.quantity }}</span>
          <span>{{ item.price * item.quantity }}€</span>
        </div>
        <div class="summary-total">
          <span>Total</span>
          <span>{{ total }}€</span>
        </div>
      </div>

      <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()">
        <div class="card-element">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Numéro de carte</mat-label>
            <input matInput formControlName="cardNumber" placeholder="1234 1234 1234 1234">
          </mat-form-field>

          <div class="card-details">
            <mat-form-field appearance="outline">
              <mat-label>Date d'expiration</mat-label>
              <input matInput formControlName="expiryDate" placeholder="MM/YY">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>CVC</mat-label>
              <input matInput formControlName="cvc" placeholder="123">
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Nom sur la carte</mat-label>
            <input matInput formControlName="cardholderName">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Pays</mat-label>
            <mat-select formControlName="country">
              <mat-option value="FR">France</mat-option>
              <mat-option value="ES">Espagne</mat-option>
              <mat-option value="DE">Allemagne</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-checkbox formControlName="saveCard">
            Sauvegarder ma carte pour mes prochains achats
          </mat-checkbox>
        </div>

        <div class="actions">
          <button mat-button type="button" (click)="onCancel()">Annuler</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!paymentForm.valid">
            Payer {{ total }}€
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .checkout-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }

    h2 {
      margin-bottom: 24px;
    }

    .order-summary {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 24px;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #ddd;
      font-weight: bold;
    }

    .card-element {
      margin-top: 24px;
    }

    .card-details {
      display: flex;
      gap: 16px;
    }

    .full-width {
      width: 100%;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
    }

    mat-form-field {
      margin-bottom: 16px;
    }
  `]
})
export class CheckoutComponent implements OnInit {
  paymentForm: FormGroup;
  cartItems = [
    { 
      name: 'Big Burger', 
      quantity: 1, 
      price: 8.00,
      image: 'assets/images/burger.png'
    },
    { 
      name: 'American Menu', 
      quantity: 1, 
      price: 12.00,
      image: 'assets/images/menu.png'
    },
    { 
      name: 'Frites', 
      quantity: 1, 
      price: 2.00,
      image: 'assets/images/fries.png'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      cardholderName: ['', Validators.required],
      country: ['FR', Validators.required],
      saveCard: [false]
    });
  }

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  ngOnInit() {
    // Initialize Stripe
    const stripe = Stripe('your_publishable_key'); // Replace with your Stripe test key
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      // Here we would normally process the payment with Stripe
      // For demo purposes, we'll just simulate a successful payment
      this.router.navigate(['/order-confirmation']);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
} 