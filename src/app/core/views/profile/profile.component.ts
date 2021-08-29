import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user';
import { ModalsService } from 'src/app/shared/modals.service';
import { UpdateUserService } from 'src/app/shared/services/update-user.service';
import { AuthService } from '../../services/auth.service';
import { ToastMessagesService } from '../../services/toast-messages.service';
import { ServiceProfile } from './service/profile-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: UserModel | null;
  roleForm: FormGroup;
  error = false;
  private readonly APP_USER = 'tkn_streamclass';

  spinner: boolean = false;
  constructor(
    route: ActivatedRoute,
    fb: FormBuilder,
    private authService: AuthService,
    private modal: ModalsService,
    private updateUser: UpdateUserService,
    private toastService: ToastMessagesService,
    private profileService: ServiceProfile
  ) {
    this.roleForm = fb.group({
      role: [''],
    });
  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }
  signout(): void {
    this.authService.logOutUser();
  }

  editUser(type: string): void {
    this.modal
      .alert({
        title: `Editar ${type}`,
        optionYes: 'Confirmar',
        optionNo: 'Cancelar',
        property: type,
      })
      .pipe(
        filter((data) => !!data),
        tap(() => (this.spinner = true)),
        switchMap((data) => this.updateUser.updateUser(data))
      )
      .subscribe((user) => {
        if (!user) {
          this.spinner = false;
          return;
        }
        this.authService.storeNewUserChanges(user);
        this.user = user;
        this.spinner = false;
      });
  }

  editAvatar(): void {
    this.modal
      .file({
        title: 'Seleccione una nueva imagen',
        optionNo: 'Cancelar',
        optionYes: 'Confirmar',
        file: '',
      })
      .pipe(
        filter((file) => !!file),
        tap(() => (this.spinner = true)),
        switchMap((file) => this.updateUser.updateAvatar(file))
      )
      .subscribe((user) => {
        this.authService.storeNewAvatar(user);
        this.user = user;
        this.spinner = false;
      });
  }

  /*saveForm(form: FormGroup) {
    if (form.valid) {
      this.profileService.changePlan(form.value).subscribe((user) => {
        this.authService.setTokenChangePlanToken(user);
        this.user = user;
      });
    }
  }*/
}
