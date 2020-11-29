import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(err: HttpEvent<any>): Observable<HttpEvent<any>> {
    // if (!environment.production) {
    //   // Do something with the error
    //   log.error('Request error', response);
    // }
    if (err instanceof HttpErrorResponse && err.status === 401) {
      localStorage.removeItem('auth_token');
      this.router.navigate(['auth/login']);
      // this.toastr.error('Session Expired');
      return of(err as any);
    }
    if (err instanceof HttpErrorResponse && err.status === 500) {
      // window.location.href = `${environment.apiUrl}/error-505`;
      // this.router.navigate(['error-505']);
       alert('Internal Server Error');
    }
    throw err;
  }

}
