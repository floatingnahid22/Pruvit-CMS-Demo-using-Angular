import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const localAccessToken = localStorage.getItem('access_token');
    const accessToken = localAccessToken ? JSON.parse(localAccessToken) : '';
    const localTokenType = localStorage.getItem('token_type');
    const tokenType = localTokenType ? JSON.parse(localTokenType) : '';
    
    request = request.clone({
      headers: request.headers.set('Authorization',  tokenType + ' ' + accessToken),
    });
    return next.handle(request);
  }
}
