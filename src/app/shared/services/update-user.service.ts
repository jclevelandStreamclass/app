import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserModel } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  private URL = 'http://localhost:3000/users';
  constructor(private http: HttpClient, private auth: AuthService) {}

  updateUser(values: { property: string; value: string }): Observable<any> {
    const userId = this.auth.user?.id;
    const key = values.property;

    return this.http
      .put<UserModel>(`${this.URL}/${userId}`, { [key]: values.value })
      .pipe(map((user) => new UserModel(user)));
  }
}
