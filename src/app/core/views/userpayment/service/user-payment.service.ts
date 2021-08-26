import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserModel } from 'src/app/models/user';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserPaymentModelService {

  private URL = environment.url + '/users/plan';
  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) {}

  changePlan(form: any): Observable<any> {

    const userId = this.authService.user?.id;
    return this.http.put(`${this.URL}/${userId}`, form).pipe(
      map((user) => {
        return new UserModel(user);
      })
    );
  }
}
