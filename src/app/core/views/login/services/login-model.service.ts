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
@Injectable({
  providedIn: 'root',
})
export class LoginModelService {
  private URL = 'http://localhost:3000/users/login';

  constructor(
    private http: HttpClient,
    private toastMessages: ToastMessagesService
  ) {}

  // login(user: UserModel): Observable<UserModel | null> {
  //   return this.http
  //     .post<UserModel>(this.URL, user, { observe: 'response' })
  //     .pipe(
  //       map((u) => {
  //         return new UserModel(u.body);
  //       })
  //     );
  // }

  login(values: { email: string; password: string }): Observable<any> {
    console.log(values);
    return this.http
      .post<UserModel>(this.URL, values, { observe: 'response' })
      .pipe(
        map((u) => {
          return new UserModel(u.body);
        }),
        catchError((e: HttpErrorResponse) => {
          if (e.status === HttpStatusCode.InternalServerError) {
            this.toastMessages.showError('Error en el servidor');
          }

          if (e.error.message === 'Wrong password') {
            this.toastMessages.showError(
              'Los datos introducidos no son correctos'
            );
          }
          console.log(e.message);
          return of(null);
        })
      );
  }
}
