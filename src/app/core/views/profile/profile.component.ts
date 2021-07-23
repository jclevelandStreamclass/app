import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { ModalsService } from 'src/app/shared/modals.service';
import { UpdateUserService } from 'src/app/shared/services/update-user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: UserModel | null;
  constructor(
    private authService: AuthService,
    private modal: ModalsService,
    private router: Router,
    private updateUser: UpdateUserService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user;
  }
  signout(): void {
    this.authService.logOutUser();
  }

  editUser(type: string): void {
    this.modal.alert({
      title: `Editar ${type}`,
      optionYes: 'Confirmar',
      optionNo: 'Cancelar',
      property: type,
    });
  }

  editAvatar(): void {
    this.modal
      .file({
        title: 'Selecione una nueva imagen',
        optionNo: 'Cancelar',
        optionYes: 'Confirmar',
        file: '',
      })
      .subscribe((file) => {
        this.updateUser.updateAvatar(file).subscribe((user) => {
          console.log(user);
          console.log(user.avatar);
          this.authService.storeNewAvatar(user);
          this.user = user;
        });
      });
  }
}
