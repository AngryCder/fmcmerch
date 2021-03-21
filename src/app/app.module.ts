import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ProfileComponent } from './profile/profile.component';
import { SepComponent } from './sep/sep.component';
import { FaqComponent } from './faq/faq.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import {NgxWebstorageModule} from 'ngx-webstorage';



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SepComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxWebstorageModule.forRoot(),
    NoopAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule
  ],
   providers: [{
      provide: 'SocialAuthServiceConfig',
      useValue: {
      autoLogin: false,
      providers: [
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              //'214944693451-44fee8em9ahdseehh4m0imeinqsn90o8.apps.googleusercontent.com'
              '214944693451-8h0s6lq4pd7ls02n71pulda5sabjqq5c.apps.googleusercontent.com'
              //'214944693451-6q967rohsbakus5g1k02k2hk3nv7inat.apps.googleusercontent.com'
            )
          }
        ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
