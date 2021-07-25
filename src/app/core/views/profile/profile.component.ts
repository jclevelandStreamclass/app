import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { ModalsService } from 'src/app/shared/modals.service';
import { UpdateUserService } from 'src/app/shared/services/update-user.service';
import { AuthService } from '../../services/auth.service';
import { ToastMessagesService } from '../../services/toast-messages.service';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServiceProfile } from './service/profile-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {
  user!: UserModel | null;
  roleForm: FormGroup;
  error = false;



  constructor(route: ActivatedRoute, fb: FormBuilder,
    private authService: AuthService,
    private modal: ModalsService,
    private updateUser: UpdateUserService,
    private toastService: ToastMessagesService,
    private profileService: ServiceProfile,
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
        title: 'Seleccione una nueva imagen',
        optionNo: 'Cancelar',
        optionYes: 'Confirmar',
        file: '',
      })
      .subscribe((file) => {
        if (file) {
          this.updateUser.updateAvatar(file).subscribe((user) => {
            this.authService.storeNewAvatar(user);
            this.user = user;
          });
          return;
        }
      });
    
   
  }

 

  saveForm(form: FormGroup) {
    console.log(form.value);
    if (form.valid) {
      this.profileService.changePlan(form.value).subscribe();
    }
  }

 
  // changeProfile(): boolean {
  //   if (this.user === Premium) {
  //     this.user = this.user
  //   } else {
  //     this.user = Premium;
  //   }
  //     return;
  // }

 
}


  // updateAvatar(form: FormRole): Observable<any> {
  //   const userId = this.auth.user?.id;
  //   return this.http.put(`${this.URL}/${userId}`, form).pipe(
  //     map((user) => {
  //       console.log(user);
  //       new UserModel(user);
  //       // this.toastMessages.showSuccessNoTime(`Imagen guardada`);
  //       // this.authService.storeNewAvatar();
  //       // this.authService.logOutUser();
  //       // this.router.navigate(['/login']);
  //       return user;
  //     }),
  //     catchError((e: HttpErrorResponse) => {
  //       if (e.status === HttpStatusCode.InternalServerError) {
  //         this.toastMessages.showError(
  //           'Hubo un error en el servidor' + HttpStatusCode.InternalServerError
  //         );
  //       }

  //       // if (e.error.message.includes('Invalid image file')) {
  //       //   this.toastMessages.showError('Introduce una imagen correcta');
  //       // }

  //       console.log(e.message);
  //       return of(null);
  //     })
  //   );
  // }
