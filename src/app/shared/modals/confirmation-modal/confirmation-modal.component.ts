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
    return this.editUser.value.value !== this.editUser.value.rPassword;
  }

  saveClick(form: FormGroup) {
    if (this.checkPassword()) return;

    if (form.valid) {
      this.updateUserService.updateUser(form.value).subscribe();
      return;
    }
    this.toastService.showError('Error al guardar');
  }

  // saveAvatar(form: FormGroup) {
  //   if (form.valid) {
  //     this.updateUserService.updateAvatar(form.value).subscribe();
  //     return;
  //   }
  //   this.toastService.showError('Error al guardar');
  // }
}
