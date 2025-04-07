import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { RestaurateurMenu } from '../../models/restaurateur.model';

@Component({
  selector: 'app-restaurateur-menu-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule
  ],
  templateUrl: './restaurateur-menu-update.component.html',
  styleUrls: ['./restaurateur-menu-update.component.scss']
})
export class RestaurateurMenuUpdateComponent implements OnInit {
  menuForm: FormGroup;
  selectedImage: string | null = null;
  availableItems = [
    { id: '1', name: 'Classic Burger' },
    { id: '2', name: 'Frites' },
    { id: '3', name: 'Coca' },
    { id: '4', name: 'Glace' }
  ];

  constructor(private fb: FormBuilder) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      items: [[], Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.menuForm.valid) {
      const formData = this.menuForm.value;
      // TODO: Implement save logic
      console.log('Form submitted:', formData);
    }
  }

  onCancel(): void {
    // TODO: Implement cancel logic
  }
} 