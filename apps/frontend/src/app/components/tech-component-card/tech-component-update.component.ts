import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface DevComponent {
  id: string;
  name: string;
  description: string;
  image: string;
  githubLink: string;
}

@Component({
  selector: 'app-tech-component-update',
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
    <div class="component-update">
      <div class="dialog-header">
        <h2>Edition composant</h2>
        <button mat-icon-button (click)="onCancel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      
      <mat-divider></mat-divider>
      
      <form #componentForm="ngForm" class="dialog-content">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nom</mat-label>
          <input matInput placeholder="ex : Composant" 
                 [(ngModel)]="component.name" name="name" required>
          <mat-icon matSuffix>code</mat-icon>
        </mat-form-field>

        <div class="photo-upload">
          <label>Photo</label>
          <div class="upload-container">
            <input type="file" #fileInput style="display: none" 
                   accept="image/*" (change)="onFileSelected($event)">
            <button mat-raised-button color="primary" (click)="fileInput.click()">
              <mat-icon>upload</mat-icon>
              PARCOURIR LES FICHIERS
            </button>
            @if (component.image) {
              <div class="image-preview">
                <img [src]="component.image" [alt]="component.name">
                <button mat-icon-button color="warn" class="remove-image"
                        (click)="removeImage()">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            }
          </div>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description (optionnelle)</mat-label>
          <textarea matInput placeholder="ex : Pain, salade, tomate, oignon..."
                    [(ngModel)]="component.description" name="description"
                    rows="3"></textarea>
          <mat-icon matSuffix>description</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Lien de téléchargement</mat-label>
          <input matInput placeholder="ex : https://exemple.com" 
                 [(ngModel)]="component.githubLink" name="githubLink" required>
          <mat-icon matSuffix>link</mat-icon>
        </mat-form-field>
      </form>
      
      <mat-divider></mat-divider>

      <div class="dialog-actions">
        <button mat-button (click)="onCancel()">ANNULER</button>
        <button mat-raised-button color="primary" 
                (click)="onSave()" [disabled]="!componentForm.valid">
          SAUVEGARDER
        </button>
      </div>
    </div>
  `,
  styles: [`
    .component-update {
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
export class TechComponentUpdateComponent implements OnInit {
  component: Partial<DevComponent> = {};

  constructor(
    private dialogRef: MatDialogRef<TechComponentUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { component?: DevComponent }
  ) {}

  ngOnInit(): void {
    if (this.data.component) {
      this.component = { ...this.data.component };
    }
  }

  onSave(): void {
    this.dialogRef.close(this.component);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        this.component.image = e.target?.result as string;
      };
      
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.component.image = undefined;
  }
} 