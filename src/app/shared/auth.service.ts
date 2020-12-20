import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { Observable, from, BehaviorSubject, of, NextObserver } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Role } from "../core/enums/role";
import { RegisterCredentials, SignInCredentials } from "../core/models/auth";
import { User } from "../core/models/user/user.model";
// import { CompanyService } from "../core/services/company.service";
declare const FB: any;

@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private socialAuthService: SocialAuthService,
    // private companyService: CompanyService,
    private http: HttpClient
  ) {
    this.fbConfig();

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private fbConfig() {
    FB.init({
      appId: environment.facebookAppId,
      status: false, // the SDK will attempt to get info about the current user immediately after init
      cookie: true, // enable cookies to allow the server to access
      // the session
      xfbml: false, // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
      version: "v3.0", // use graph api version 2.5
    });
  }

  login(credentials: SignInCredentials) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/login`, credentials)
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          this.setUserAsAuthenticatedLocally(res);
          return res;
        })
      );
  }

  register(credentials: RegisterCredentials) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/register`, credentials)
      .pipe(
        map((res: any) => {
          // register successful if user came back
          this.setUserAsAuthenticatedLocally(res);
          return res;
        })
      );
  }

  sendPasswordEmail(email: string) {
    // logic here..
  }

  /* Login Facebook */

  fbLogin() {
    return new Observable((observer: NextObserver<any>) => {
      FB.login(
        (result) => {
          console.log(
            "🚀 ~ file: auth.service.ts ~ line 47 ~ AuthService ~ returnnewPromise ~ result",
            result
          );
          if (result.authResponse) {
            return this.http
              .get(`${environment.apiUrl}/api/auth/facebook`, {
                params: { access_token: result.authResponse.accessToken },
              })
              .subscribe((res: any) => {
                console.log("🚀 ~", res);
                this.setUserAsAuthenticatedLocally(res);

                observer.next(res);
                observer.complete();
              });
          } else {
            observer.next(false);
            observer.error(result);
          }
        },
        { scope: "public_profile,email" }
      );
    });
  }

  /* google login */

  googleLogin() {
    console.log("🚀 ~ >>>>>>");

    return new Observable((observer: NextObserver<any>) => {
      this.socialAuthService
        .signIn(GoogleLoginProvider.PROVIDER_ID)
        .then((res) => {
          if (res.idToken) {
            // call server to verify
            this.http
              .get(`${environment.apiUrl}/api/auth/google`, {
                params: { idToken: res.idToken },
              })
              .subscribe(
                (res: any) => {
                  console.log("🚀 ~", res);
                  this.setUserAsAuthenticatedLocally(res);

                  observer.next(res);
                  observer.complete();
                },
                (err) => {
                  console.log(
                    "🚀 ~ file: auth.service.ts ~ line 201 ~ AuthService ~ this.socialAuthService.signIn ~ err",
                    err
                  );
                }
              );
          }
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: register.component.ts ~ line 63 ~ RegisterComponent ~ this.socialAuthService.signIn ~ err",
            err
          );
          observer.next(err);
          observer.error(err);
        });
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    this.currentUserSubject.next(null);
    return of(true);
  }

  facebookLogout(): Observable<any> {
    return new Observable((observer: NextObserver<any>) => {
      FB.logout((response: any) => {
        // add logic to store user in localstorage
        // this.response = response;
        // this.fbLoginStatus = response.status;
        // observer.next(this.response);
        // observer.complete();
      });
    });
  }

  // user data
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get isAdmin() {
    return (
      this.currentUserValue && this.currentUserValue.roles.includes(Role.Admin)
    );
  }

  setUserInLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem("user"));
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem("auth_token") ? true : false;
  }

  private setUserAsAuthenticatedLocally(user) {
    const { data } = user;
    if (data) {
      const token = data.access_token;
      console.log(token);
      const currentuser : User = data.user;
      console.log(
        "🚀 ~ file: auth.service.ts ~ line 95 ~ AuthService ~ .pipe ~ user",
        user
      );
      if (token) localStorage.setItem("auth_token", token);
      if (currentuser)
        localStorage.setItem("user", JSON.stringify(currentuser));
      this.currentUserSubject.next(currentuser);

      // set company
      if (currentuser.roles.includes(Role.Company)) {
        //-- temp
        localStorage.setItem("company", currentuser.companySubdomain);
        // cyclic dependecises
        // this.companyService.setCompanyInfoInLocalStorage(currentuser.companySubdomain)
      }
    }
  }
}
