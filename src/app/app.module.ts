import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { LayoutContainersModule } from './containers/layout/layout.containers.module';
import { CoreModule } from './core/core.module';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    BrowserModule,
    ViewsModule,
    AppRoutingModule,
    LayoutContainersModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    SimpleNotificationsModule.forRoot({
      position: ['bottom', 'right'],
    }),
    SocialLoginModule,
    NgxSpinnerModule,
    NgxSmartModalModule.forRoot(),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId
            )
          },
        ]
      } as SocialAuthServiceConfig,
    },
    NgxSpinnerService,
    NgxSmartModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
