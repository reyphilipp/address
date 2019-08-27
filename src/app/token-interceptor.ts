import { AuthService } from './services/auth.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class TokenInterceptor implements HttpInterceptor {
  excludeUrl = 'rest-auth/login';

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.search(this.excludeUrl) === -1) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
