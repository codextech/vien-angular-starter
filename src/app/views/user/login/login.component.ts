import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  emailModel = 'tanzeel@getnada.com';
  passwordModel = 'Asdf@123';

  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: AuthService,
    private alertService: AlertService,
     private notifications: NotificationsService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.loginForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    this.authService.login(this.loginForm.value).subscribe((user) => {
      this.router.navigate(['/']);

    }, (error) => {
      this.buttonDisabled = false;
      this.buttonState = '';
      // this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    });
  }



  fbAuthentication() {
    this.authService.fbLogin().subscribe(res => {
      // this.router.navigate(['/']);
      this.router.navigate(['/']);

    }, err => {
      this.alertService.addError('Error', 'Something Went Wrong')
    console.log("🚀 ~ file: register.component.ts ~ line 44 ~ RegisterComponent ~ this.authService.fbLogin ~ err", err)
    });
  }



  googleAuthentication() {
    this.authService.googleLogin().subscribe(res => {
      this.router.navigate(['/']);
    }, err => {
      this.alertService.addError('Error', 'Something Went Wrong')
    });
  }

}
