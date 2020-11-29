import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Role } from '../core/enums/role';
import { IChangePassword, IRegisterCredentials, IResetPassword, ISignInCredentials } from '../core/models/auth';
import { User } from '../core/models/user/user.model';



@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }


login(credentials: ISignInCredentials) {
  return this.http.post<any>(`${environment.apiUrl}/authenticate`, credentials)
      .pipe(map((user : User) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
          }
          return user;
      }));
}


  register(credentials: IRegisterCredentials) {
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, credentials)
    .pipe(map((user : User) => {
        // register successful if user came back
        if (user) {
/*             // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user); */

            // redirect to for email verification

        }
        return user;
    }));
  }

  sendPasswordEmail(email: string) {
    // logic here..
  }

  resetPassword(credentials: IResetPassword) {
   // logic here
  }

  changePassword(credentials: IChangePassword) {
    // logic here
   }



logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
  return of(true);
}

// user data
public get currentUserValue(): User {
  return this.currentUserSubject.value;
}


get isAdmin() {
  return this.currentUserValue && this.currentUserValue.role === Role.Admin;
}

}
