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

  get localUser(): UserModel | null {
    const user = localStorage.getItem(this.APP_USER);
    return user ? new UserModel(JSON.parse(user)) : null;
  }

  storeNewAvatar(user: UserModel): void {
    if (this.isUserAuthenticated) {
      localStorage.setItem(
        this.APP_USER,
        JSON.stringify({ ...this.localUser, avatar: user.avatar })
      );
    }
    this.userSubject$.next(user);
  }

  storeNewUserChanges(user: UserModel): void {
    if (this.isUserAuthenticated) {
      localStorage.setItem(
        this.APP_USER,
        JSON.stringify({
          ...this.localUser,
          email: user.email,
          phone: user.phone,
        })
      );
    }
    this.userSubject$.next(user);
  }

  setTokenChangePlanToken(user: UserModel): void {
    if (this.isUserAuthenticated) {
      localStorage.setItem(
        this.APP_USER,
        JSON.stringify({
          ...this.localUser,
          bearer: user.bearer,
          role: user.role,
        })
      );
    }
    this.userSubject$.next(user);
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
