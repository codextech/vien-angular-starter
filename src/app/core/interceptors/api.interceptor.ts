import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private spinner: NgxSpinnerService,
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler
    ) {
    const authToken = localStorage.getItem('auth_token') || '';
    const isApiUrl = req.url.startsWith(environment.apiUrl);
    const isLoggedIn = true; // temporary
    if (isApiUrl) {
        req = req.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${authToken}`,
          })
        });
    }


    //   this.ngxUiLoaderService.start();
    // this.spinner.show('apiLoader');
    this.spinner.show();

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          //temporary
          let body = event.body && event.body.data ? event.body : {data : event.body};
          // change the response body here
          return event.clone({
            body: body,
          });
        }
        return event;
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
