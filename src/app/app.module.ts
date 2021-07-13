import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { AppComponent } from './core/views/app.component';
import { HomeComponent } from './core/views/home/home.component';
import { LandingComponent } from './core/views/landing/landing.component';
import { LoginComponent } from './core/views/login/login.component';
import { RecoverpasswordComponent } from './core/views/recoverpassword/recoverpassword.component';
import { SignupComponent } from './core/views/signup/signup.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesGridComponent } from './categories/categories-grid/categories-grid.component';
import { CategoriesPageComponent } from './categories/categories-page/categories-page.component';
import { SeriesComponent } from './series/series.component';
import { SeriesCardsComponent } from './series/series-cards/series-cards.component';
import { HttpClientModule } from '@angular/common/http';
import { SeriesGridLandingComponent } from './series/series-grid-landing/series-grid-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    RecoverpasswordComponent,
    CategoriesComponent,
    CategoriesGridComponent,
    CategoriesPageComponent,
    SeriesComponent,
    SeriesCardsComponent,
    SeriesGridLandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
