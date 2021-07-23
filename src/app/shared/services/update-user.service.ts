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

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  private URL = 'http://localhost:3000/users';

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
          this.toastMessages.showSuccessNoTime(`${key} Guardado`);
          this.authService.logOutUser();
          this.router.navigate(['/login']);
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
          console.log(e.message);
          return of(null);
        })
      );
  }
}
