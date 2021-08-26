import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';
import { UserModel } from 'src/app/models/user';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupModelService {
  private URL = environment.url + '/users/signup';

  constructor(
    private http: HttpClient,
    private toastMessages: ToastMessagesService
  ) {}

  insertUser(user: UserModel): Observable<UserModel | null> {
    // ESTABLECEMOS COMO DEFAULT
    if (user.avatar === '') {
      user.avatar = environment.avatar;
    }

    return this.http
      .post<UserModel>(`${this.URL}`, user, { observe: 'response' })
      .pipe(
        map((x) => new UserModel(x)),
        catchError((e: HttpErrorResponse) => {
          if (e.status === HttpStatusCode.InternalServerError) {
            console.log(
              'Error en el servidor',
              HttpStatusCode.InternalServerError
            );
            this.toastMessages.showError('Hubo un error en el servidor');
          }

          if (e.error.message === 'Validation error') {
            console.log('Error en el servidor', HttpStatusCode.BadRequest);
            this.toastMessages.showError(
              'Hubo un error al dar de alta el usuario, el Email esta en uso'
            );
          }
          return of(null);
        })
      );
  }
}
