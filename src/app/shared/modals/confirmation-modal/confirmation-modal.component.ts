import {
  Component,
  OnInit,
  Inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class ConfirmationModalComponent implements OnInit, OnChanges {
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
      rPassword: ['', Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.checkPassword();
    }
    console.log(changes.data.currentValue);
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  checkPassword() {
    const password = this.editUser.get('value')?.value;
    const passwordConfirm = this.editUser.get('rPasswordConfirm')?.value;
    console.log(password, passwordConfirm);
    if (password !== passwordConfirm) {
      this.editUser.setErrors({ rPasswordConfirm: 'Passwords do not match' });
      console.log('Password error');
    } else {
      this.editUser.setErrors(null);
    }
  }

  saveClick(form: FormGroup) {
    if (form.valid) {
      this.updateUserService.updateUser(form.value).subscribe();
      return;
    }
    this.toastService.showError('Error al guardar');
  }
}
