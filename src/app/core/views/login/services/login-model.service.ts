import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user';
@Injectable({
  providedIn: 'root',
})
export class LoginModelService {
  private URL = 'http://localhost:3000/users/login';

  constructor(private http: HttpClient) {}

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
            console.log(
              'Error en el servidor',
              HttpStatusCode.InternalServerError
            );
          }
          console.log(e.message);
          return of(null);
        })
      );
  }
}
