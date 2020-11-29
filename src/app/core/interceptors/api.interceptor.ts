import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable()
export class ApiInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('auth_token') || '';
    // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE1OTkxMjI0MDgsImV4cCI6MTYxNjQwMjQwOCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNWVhOTMzNjdmMDg3YTMzZTU1MDY2MzA0IiwianRpIjoiYjUyMWU0MWEtNmEwNi00NzFlLWIwMjgtZDY1NTZhZTM4OTUwIn0.2Hsdg0eBbKu_djX1lXMn4u7JjV_l0lhNuMIOiG91H3Q';
    // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE1OTkxMjI4NjgsImV4cCI6MTYxNjQwMjg2OCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNWU4OTg0YTU3ZjJmMGU0ZjFjOTQ0OWJiIiwianRpIjoiYjI1M2ZiZjMtYzBjMC00NjRjLTkyOWYtYjMzZjY0ZWViNzRhIn0.SBibRwz5pqJjghACRsPUWtWx1f1eELNocLhCU0lj4mU';
    const isApiUrl = req.url.startsWith(environment.apiUrl);
    const isLoggedIn = true; // temporary
    if (isLoggedIn && isApiUrl) {
        req = req.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${authToken}`,
          })
        });
    }


    //   this.ngxUiLoaderService.start();
    // this.spinner.show('apiLoader');
    return next.handle(req)
  }
}
