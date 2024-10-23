import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { authTokenKey } from '../constants/auth-constants';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let clonedRequest = req;

    if (this.cookieService.get(authTokenKey)) {
      clonedRequest = this.addCredential(
        clonedRequest,
        'X-Access-Token',
        this.cookieService.get(authTokenKey),
      );
    }

    return handler.handle(clonedRequest).pipe(
      tap({
        next: (res) => {
        },
        error: (error) => {
          if (error.status == 401) {
            console.error('Error', 'Checking');
          }
        },
      }),
      finalize(() => {
        // console.log('Request Completed');
      }),
    );
  }

  private addCredential(req: any, key: any, value: any): any {
    return req.clone({
      setHeaders: {
        [key]: value,
      },
    });
  }
}
