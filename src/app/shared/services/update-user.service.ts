import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';
import { UserModel } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  private URL = environment.url + '/users';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private toastMessages: ToastMessagesService,
    private router: Router,
    private authService: AuthService
  ) {}

  updateUser(values: { property: string; value: string }): Observable<any> {
    const userId = this.auth.user?.id;
    const key = values.property;

    return this.http
      .put<UserModel>(`${this.URL}/${userId}`, { [key]: values.value })
      .pipe(
        map((user) => {
          new UserModel(user);

          if (key === 'password') {
            this.toastMessages.showSuccessNoTime(
              `${key} actualizada con éxito. Puedes iniciar sesión con tus nuevos datos`
            );
            this.authService.logOutUser();
            this.router.navigate(['/login']);
            return user;
          }
          if (key) {
            this.toastMessages.showSuccessNoTime(`${key} Guardado`);
          }
          return user;
        }),
        catchError((e: HttpErrorResponse) => {
          if (e.status === HttpStatusCode.InternalServerError) {
            this.toastMessages.showError(
              'Hubo un error en el servidor' +
                HttpStatusCode.InternalServerError
            );
          }

          if (e.error.message.includes('fails to match the required pattern')) {
            this.toastMessages.showError(
              'Introduce una contraseña con al menos una letra mayuscula y 6 caracteres'
            );
          }

          if (e.error.message.includes('must be a valid email')) {
            this.toastMessages.showError('Introduce un email correcto');
          }
          if (e.error.message.includes('This email is already being used')) {
            this.toastMessages.showError('Este email no está disponible');
          }
          console.log(e.message);
          return of(null);
        })
      );
  }

  updateAvatar(form: FormData): Observable<any> {
    const userId = this.auth.user?.id;
    return this.http.put(`${this.URL}/${userId}`, form).pipe(
      map((user) => {
        new UserModel(user);
        this.toastMessages.showSuccessNoTime(`Imagen guardada`);
        return user;
      }),
      catchError((e: HttpErrorResponse) => {
        if (e.status === HttpStatusCode.InternalServerError) {
          this.toastMessages.showError(
            'Hubo un error en el servidor' + HttpStatusCode.InternalServerError
          );
        }

        if (e.error.message.includes('Invalid image file')) {
          this.toastMessages.showError('Introduce una imagen correcta');
        }

        console.log(e.message);
        return of(null);
      })
    );
  }
}
