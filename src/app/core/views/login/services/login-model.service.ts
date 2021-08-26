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
export class LoginModelService {
  private URL = environment.url+ '/users/login';
  private ACTIVATE = environment.url + '/users';

  constructor(
    private http: HttpClient,
    private toastMessages: ToastMessagesService
  ) {}

  login(values: { email: string; password: string }): Observable<any> {
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

          if (e.error.message === 'Not found user') {
            this.toastMessages.showError('Usuario no encontrado');
          }

          return of(null);
        })
      );
  }

  activateUser(id: string): Observable<null> {
    return this.http.get<UserModel>(`${this.ACTIVATE}/activate/${id}`).pipe(
      map((u) => {
        return null;
      })
    );
  }
}
