import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  readonly excludeUrls = [
    'login',
    'landing',
    'categories',
    'series',
    'signup',
    'category',
    'contacts',
    'episodes',
    'sportsplayer',
    'home',
  ];
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    for (let index = 0; index < this.excludeUrls.length; index++) {
      if (request.url.toLowerCase().includes(this.excludeUrls[index])) {
        return next.handle(request);
      }
    }

    const newRequest = request.clone({
      headers: request.headers.set(
        'Authorization',
        `bearer ${this.authService.bearer}`
      ),
    });
    console.log(newRequest);
    return next.handle(newRequest);
  }
}
