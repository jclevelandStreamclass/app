import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user';
import { LoginModelService } from '../views/login/services/login-model.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly APP_USER = 'tkn_streamclass';
  constructor(private loginService: LoginModelService) {}

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

  hasUserRole(role: string): boolean {
    return this.user ? this.user.role === role : false;
  }

  storeUser(usuario: UserModel) {
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario));
    // this.initializeRefreshToken(usuario)
  }

  logOutUser(): void {
    localStorage.removeItem(this.APP_USER);
  }
}
