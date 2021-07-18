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
export class SignupModelService {
  private URL = 'http://localhost:3000/users/signup';

  constructor(private http: HttpClient) {}

  insertUser(user: UserModel): Observable<UserModel | null> {
    console.log(user.avatar);
    console.log(user.avatar.slice(12));
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
          }
          console.log(e.message);
          return of(null);
        })
      );
  }
}
