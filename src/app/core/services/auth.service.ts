import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../../models/user';
import { LoginModelService } from '../views/login/services/login-model.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly APP_USER = 'tkn_streamclass';
  private readonly userSubject$ = new BehaviorSubject<UserModel | null>(
    this.user
  );
  constructor(private loginService: LoginModelService, private route: Router) {}

  get isUserAuthenticated(): boolean {
    return !!localStorage.getItem(this.APP_USER);
  }

  get bearer(): string {
    const bearer = localStorage.getItem(this.APP_USER);
    if (bearer) {
      const user: UserModel = JSON.parse(bearer);
      return user.bearer;
    }
    return '';
  }

  get user(): UserModel | null {
    const bearer = localStorage.getItem(this.APP_USER);
    return bearer ? new UserModel(JSON.parse(bearer)) : null;
  }

  storeNewAvatar(user: UserModel): void {
    localStorage.setItem(this.APP_USER, JSON.stringify(user));
    if (this.isUserAuthenticated) {
      this.userSubject$.next(user);
      localStorage.setItem(this.APP_USER, JSON.stringify(user));
    }
  }

  hasUserRole(role: string): boolean {
    return this.user ? this.user.role === role : false;
  }

  storeUser(usuario: UserModel) {
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario));
    this.userSubject$.next(usuario);
    // this.initializeRefreshToken(usuario)
  }

  getUser$(): Observable<UserModel | null> {
    return this.userSubject$.asObservable();
  }

  logOutUser(): void {
    localStorage.removeItem(this.APP_USER);
    this.route.navigate(['/landing']);
  }
}
