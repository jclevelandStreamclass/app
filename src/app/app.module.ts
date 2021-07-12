import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LandingComponent } from './core/views/landing/landing.component';
import { HomeComponent } from './core/views/home/home.component';
import { LoginComponent } from './core/views/login/login.component';
import { SignupComponent } from './core/views/signup/signup.component';
import { RecoverpasswordComponent } from './core/views/recoverpassword/recoverpassword.component';
import { AppComponent } from './core/views/app.component';
@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, LandingComponent, HomeComponent, LoginComponent, SignupComponent, RecoverpasswordComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
