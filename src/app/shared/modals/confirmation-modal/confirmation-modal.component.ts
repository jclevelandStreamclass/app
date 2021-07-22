import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';
import { UpdateUserService } from '../../services/update-user.service';

export interface ConfirmationData {
  title: string;
  optionNo: string;
  optionYes: string;
  property: string;
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  editUser: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData,
    fb: FormBuilder,
    private route: Router,
    private updateUserService: UpdateUserService,
    private toastService: ToastMessagesService,
    private authService: AuthService
  ) {
    this.editUser = fb.group({
      property: [this.data?.property],
      value: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  saveClick(form: FormGroup) {
    if (form.valid) {
      this.updateUserService.updateUser(form.value).subscribe(() => {
        this.authService.logOutUser();
        this.route.navigate(['/login']);
      });
      return;
    }
    this.toastService.showError('Error al guardar');
  }
}
