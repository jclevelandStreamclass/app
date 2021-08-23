import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'streamClass';
  loading = false;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  ngOnInit(): void {
    this.loaderService.loading.pipe(delay(0)).subscribe((x) => {
      this.loading = x;
    });
  }

  isLogged(): boolean {
    return this.authService.isUserAuthenticated;
  }

  isLoggedAdmin(): boolean {
    return this.authService.hasUserRole('admin');
  }
}
