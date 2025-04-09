import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserRole } from '../../models/user.model';
import { Injectable } from '@angular/core';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserFormBuilder {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      referralCode: ['', Validators.required],
      status: ['Actif', Validators.required]
    });
  }
}

@Component({
  selector: 'app-commercial-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DeleteUserDialogComponent
  ],
  template: `
    <div class="users-container">
      <div class="header">
        <h1>Comptes clients</h1>
        <div class="header-actions">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Rechercher un compte client</mat-label>
            <input matInput placeholder="Rechercher...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
        </div>
      </div>

      <!-- User Details Section -->
      <div class="user-details-container" *ngIf="selectedUser && !isEditing">
        <mat-card>
          <mat-card-content>
            <div class="form-container">
              <mat-form-field appearance="outline">
                <mat-label>Prénom</mat-label>
                <input matInput [value]="selectedUser.firstName" readonly>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Nom</mat-label>
                <input matInput [value]="selectedUser.lastName" readonly>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Date de naissance</mat-label>
                <input matInput [value]="selectedUser.birthDate | date:'dd/MM/yyyy'" readonly>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>E-mail</mat-label>
                <input matInput [value]="selectedUser.email" readonly>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Adresse</mat-label>
                <input matInput [value]="selectedUser.address" readonly>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Code de parrainage</mat-label>
                <input matInput [value]="selectedUser.referralCode" readonly>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Statut</mat-label>
                <input matInput [value]="selectedUser.status" readonly>
              </mat-form-field>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="editUser()">MODIFIER</button>
            <button mat-raised-button color="warn" (click)="deleteUser()">SUPPRIMER</button>
          </mat-card-actions>
        </mat-card>
      </div>

      <!-- User Edit Section -->
      <div class="user-details-container" *ngIf="selectedUser && isEditing">
        <mat-card>
          <mat-card-content>
            <form [formGroup]="userForm" class="form-container">
              <mat-form-field appearance="outline">
                <mat-label>Prénom</mat-label>
                <input matInput formControlName="firstName" placeholder="ex : Jhon">
                <mat-error *ngIf="userForm.get('firstName')?.hasError('required')">
                  Le prénom est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Nom</mat-label>
                <input matInput formControlName="lastName" placeholder="ex : Doe">
                <mat-error *ngIf="userForm.get('lastName')?.hasError('required')">
                  Le nom est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Date de naissance</mat-label>
                <input matInput formControlName="birthDate" placeholder="ex : 01/01/2020" [matDatepicker]="picker">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="userForm.get('birthDate')?.hasError('required')">
                  La date de naissance est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>E-mail</mat-label>
                <input matInput formControlName="email" placeholder="ex : cesi@cesi.Fr">
                <mat-error *ngIf="userForm.get('email')?.hasError('required')">
                  L'email est requis
                </mat-error>
                <mat-error *ngIf="userForm.get('email')?.hasError('email')">
                  Format d'email invalide
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Adresse</mat-label>
                <input matInput formControlName="address" placeholder="ex : 24 Le Paquebot">
                <mat-error *ngIf="userForm.get('address')?.hasError('required')">
                  L'adresse est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Code de parrainage</mat-label>
                <input matInput formControlName="referralCode" placeholder="ex : 1234-5678">
                <mat-error *ngIf="userForm.get('referralCode')?.hasError('required')">
                  Le code de parrainage est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Statut</mat-label>
                <mat-select formControlName="status">
                  <mat-option value="Actif">Actif</mat-option>
                  <mat-option value="Suspendu">Suspendu</mat-option>
                </mat-select>
                <mat-error *ngIf="userForm.get('status')?.hasError('required')">
                  Le statut est requis
                </mat-error>
              </mat-form-field>
            </form>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="saveUser()" [disabled]="!userForm.valid">SAUVEGARDER</button>
            <button mat-raised-button (click)="cancelEdit()">ANNULER</button>
          </mat-card-actions>
        </mat-card>
      </div>

      <table mat-table [dataSource]="users" class="mat-elevation-z2 users-table">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let user">{{ user.id }}</td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Prénom & Nom</th>
          <td mat-cell *matCellDef="let user">{{ user.firstName }} {{ user.lastName }}</td>
        </ng-container>

        <ng-container matColumnDef="birthDate">
          <th mat-header-cell *matHeaderCellDef>Date de naissance</th>
          <td mat-cell *matCellDef="let user">{{ user.birthDate | date:'dd/MM/yyyy' }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Statut</th>
          <td mat-cell *matCellDef="let user">{{ user.status }}</td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let user">
            <button mat-raised-button color="primary" (click)="showUserDetails(user)">DÉTAILS</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .header-actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    h1 {
      color: #3f51b5;
      font-weight: 500;
      margin: 0;
    }

    .search-field {
      width: 300px;
    }

    .users-table {
      width: 100%;
      margin-bottom: 30px;
    }

    th.mat-header-cell {
      font-weight: bold;
      color: rgba(0, 0, 0, 0.87);
      background-color: #f5f5f5;
    }

    .mat-column-id {
      width: 10%;
    }

    .mat-column-name {
      width: 25%;
    }

    .mat-column-birthDate {
      width: 20%;
    }

    .mat-column-status {
      width: 20%;
    }

    .mat-column-action {
      width: 25%;
      text-align: right;
    }

    .mat-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .user-details-container {
      margin-bottom: 20px;
    }

    .form-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      padding: 16px;
    }

    mat-card-actions {
      display: flex;
      gap: 8px;
      padding: 16px;
    }
  `]
})
export class CommercialUsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isEditing = false;
  displayedColumns: string[] = ['id', 'name', 'birthDate', 'status', 'action'];
  userForm: FormGroup;

  constructor(
    private formBuilder: UserFormBuilder,
    private dialog: MatDialog
  ) {
    this.userForm = this.formBuilder.createForm();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // Mock data matching the mockup
    this.users = [
      {
        id: 1,
        firstName: 'Jhon',
        lastName: 'DOE',
        birthDate: new Date('1990-01-01'),
        email: 'jhon.doe@example.com',
        address: '24 Le Paquebot',
        referralCode: '1234-5678',
        status: 'Actif',
        roles: [UserRole.CUSTOMER]
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'DOE',
        birthDate: new Date('1990-01-01'),
        email: 'jane.doe@example.com',
        address: '24 Le Paquebot',
        referralCode: '1234-5679',
        status: 'Suspendu',
        roles: [UserRole.CUSTOMER]
      }
    ];
  }

  showUserDetails(user: User): void {
    this.selectedUser = user;
    this.isEditing = false;
  }

  editUser(): void {
    if (this.selectedUser) {
      // Initialize form with the selected user's data
      this.userForm.patchValue({
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        birthDate: this.selectedUser.birthDate,
        email: this.selectedUser.email,
        address: this.selectedUser.address,
        referralCode: this.selectedUser.referralCode,
        status: this.selectedUser.status
      });
      this.isEditing = true;
    }
  }

  saveUser(): void {
    if (this.selectedUser && this.userForm.valid) {
      const formValue = this.userForm.value;
      
      const updatedUser: User = {
        ...this.selectedUser,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        birthDate: formValue.birthDate,
        email: formValue.email,
        address: formValue.address,
        referralCode: formValue.referralCode,
        status: formValue.status,
        roles: [UserRole.CUSTOMER]
      };

      const index = this.users.findIndex(u => u.id === this.selectedUser?.id);
      
      if (index !== -1) {
        // Update existing user
        this.users = [
          ...this.users.slice(0, index),
          updatedUser,
          ...this.users.slice(index + 1)
        ];
      } else {
        // Add new user
        this.users = [...this.users, updatedUser];
      }
      
      this.selectedUser = null; // Clear selection after save
      this.isEditing = false;
      this.userForm.reset(); // Reset form after save
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    if (!this.users.find(u => u.id === this.selectedUser?.id)) {
      // If canceling a new user creation, clear selection
      this.selectedUser = null;
    }
  }

  deleteUser(): void {
    if (this.selectedUser) {
      const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
        width: '400px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.users = this.users.filter(u => u.id !== this.selectedUser?.id);
          this.selectedUser = null;
        }
      });
    }
  }

  addUser(): void {
    const maxId = Math.max(...this.users.map(u => u.id), 0);
    this.selectedUser = {
      id: maxId + 1,
      firstName: '',
      lastName: '',
      birthDate: new Date(),
      email: '',
      address: '',
      referralCode: '',
      status: 'Actif',
      roles: [UserRole.CUSTOMER]
    };
    
    // Reset form with initial values
    this.userForm.reset({
      firstName: '',
      lastName: '',
      birthDate: new Date(),
      email: '',
      address: '',
      referralCode: '',
      status: 'Actif'
    });
    
    this.isEditing = true;
  }
} 