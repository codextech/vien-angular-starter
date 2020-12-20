import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { RegisterCredentials } from 'src/app/core/models/auth';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') f: NgForm;
  buttonDisabled = false;
  buttonState = '';


      // reactive form
      form: IFormGroup<RegisterCredentials>;
      formBuilder: IFormBuilder;



  constructor(private authService: AuthService,
    private notifications: NotificationsService,
    private router: Router,
    private alertService: AlertService,
    formBuilder: FormBuilder ) {
    this.formBuilder = formBuilder;
     }

  ngOnInit() {
    this.formInit()
  }


  formInit() {
    this.form = this.formBuilder.group<RegisterCredentials>({
      email: ['' ,  [Validators.required ,Validators.email]],
      password: [null ,  [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')] ],
      confirmPassword: ['' , [Validators.required] ]
    },  {validator: this.passwordConfirming });
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
}

get formFields() { return this.form.controls; }


onSubmit() {
  console.log("RegisterComponent -> onSubmit -> this.form", this.form)
  if (!this.f.valid || this.buttonDisabled) {
    return;
  }
  this.buttonDisabled = true;
  this.buttonState = 'show-spinner';
  let model =  this.form.value;
  this.authService.register(model).subscribe(() => {
    this.router.navigate(['/']);
    this.f.resetForm();
    // this.ngxSmartModalService.open('dialougeModal')
    this.buttonDisabled = false;
    this.buttonState = '';
  }, (error) => {
  this.buttonDisabled = false;
  this.buttonState = '';
  });

}


  fbAuthentication() {
    this.authService.fbLogin().subscribe(res => {
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
    console.log("🚀 ~ file: register.component.ts ~ line 44 ~ RegisterComponent ~ this.authService.fbLogin ~ err", err)
    });
  }
}
