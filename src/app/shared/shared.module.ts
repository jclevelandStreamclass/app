import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { CategoryAdminCreateModalComponent } from './modals/category-admin-create/category-admin-create.component';
import { PlayerAdminCreateModalComponent } from './modals/players-admin-create/players-admin-create.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalsService } from './modals.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MoviePromoComponent } from './movie-promo/movie-promo.component';
import { UploadAvatarModalComponent } from './modals/upload-avatar-modal/upload-avatar-modal.component';
import { SpinnerComponent } from './spinner/spinner.component';
@NgModule({
  declarations: [
    ConfirmationModalComponent,
    CategoryAdminCreateModalComponent,
    PlayerAdminCreateModalComponent,
    MoviePromoComponent,
    UploadAvatarModalComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MoviePromoComponent,
    SpinnerComponent,
  ],
  providers: [ModalsService],
})
export class SharedModule {}
