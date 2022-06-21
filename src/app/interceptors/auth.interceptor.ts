import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = 'Basic ' + localStorage.getItem("TOKEN");
    let newRequest: HttpRequest<any> = request.clone({
      headers: request.headers.set("Authorization", token)
    })
    return next.handle(newRequest);
  }
}
