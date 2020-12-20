import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';


/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router , private alertService: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(err: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      console.error('Request error', err);
    }
    if (err instanceof HttpErrorResponse && err.status === 401  || err instanceof HttpErrorResponse && err.status === 403) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      this.router.navigate(['/user/login']);
      // this.toastr.error('Session Expired');
      return of(err as any);
    }
    if (err instanceof HttpErrorResponse && err.status === 500) {
      // window.location.href = `${environment.apiUrl}/error-505`;
      // this.router.navigate(['error-505']);
       alert('Internal Server Error');
    } else if (err instanceof HttpErrorResponse && err.status >= 400) { {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>ErrorHandlerInterceptor -> err>>>>>>>>>>>>>>>>>", err)
      const errorResult: {value: string, message: string} = err.error;
      console.log("🚀 ~ file: error-handler.interceptor.ts ~ line 43 ~ ErrorHandlerInterceptor ~ errorHandler ~ errorResult", errorResult)
      const {value , message} = errorResult && errorResult;
      console.log("################ -> serverError #######################", message )
      let modelStateError = '';
      if (Array.isArray(message)) {
        // message.forEach(err => {
          modelStateError = modelStateError + message[0] + '\n';
        // });
      } else {
        modelStateError =message
      }
      // modelStateError = this.HandleModelStateEror(errors, modelStateError);
      // console.log("ErrorHandlerInterceptor -> modelStateError", modelStateError)
      // console.log("ErrorHandlerInterceptor -> errors", errors)

      let errorMessage = this.toTitleCase(modelStateError || 'Server Error')
      // notificatoin toaster.
      this.alertService.addError('Error', errorMessage)
      // return of(err as any);
      return throwError(err);
    }
  }
  }



  private HandleModelStateEror(serverError: any, modelStateError: string) {

    if (serverError && typeof serverError === 'object') {
      for (const key in serverError) {
        if (typeof serverError[key] === 'object') {
          modelStateError = this.HandleModelStateEror(serverError[key], modelStateError);
        } else if (typeof serverError[key] !== 'object') {
          modelStateError += serverError[key] + '\n';
        }
      }
    }
    return modelStateError;
  }

  toTitleCase = toTransform => {
    return toTransform.replace(/\b([a-z])/g, function(_, initial) {
      return initial.toUpperCase();
    });
  };

}
