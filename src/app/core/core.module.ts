import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar/';
import { RouterModule } from '@angular/router';
import { CategoriesGridComponent } from '../categories/categories-grid/categories-grid.component';
import { CategoriesLatestUpdateComponent } from '../categories/categories-latest-update/categories-latest-update.component';
import { CategoriesPageComponent } from '../categories/categories-page/categories-page.component';
import { CategoriesSeriesPageComponent } from '../categories/categories-series-page/categories-series-page.component';
import { CategoriesComponent } from '../categories/categories.component';
import { EpisodesStreamComponent } from '../episodes/episodes-stream/episodes-stream.component';
import { EpisodesComponent } from '../episodes/episodes.component';
import { SafePipePipe } from '../episodes/safe-pipe.pipe';
import { SeriesCardsComponent } from '../series/series-cards/series-cards.component';
import { SeriesIntroComponent } from '../series/series-cards/series-intro/series-intro.component';
import { SeriesGridLandingComponent } from '../series/series-grid-landing/series-grid-landing.component';
import { SeriesLastupdateComponent } from '../series/series-lastupdate/series-lastupdate.component';
import { SeriesComponent } from '../series/series.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLoggedComponent } from './components/header-logged/header-logged.component';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './views/app.component';
import { HomeComponent } from './views/home/home.component';
import { LandingComponent } from './views/landing/landing.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SignupComponent } from './views/signup/signup.component';
import { UserpaymentComponent } from './views/userpayment/userpayment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    LandingComponent,
    HomeComponent,
    SignupComponent,
    CategoriesComponent,
    CategoriesGridComponent,
    CategoriesPageComponent,
    CategoriesSeriesPageComponent,
    SeriesComponent,
    SeriesCardsComponent,
    SeriesGridLandingComponent,
    SeriesIntroComponent,
    EpisodesComponent,
    SafePipePipe,
    EpisodesStreamComponent,
    HeaderLoggedComponent,
    ProfileComponent,
    UserpaymentComponent,
    SeriesLastupdateComponent,
    CategoriesLatestUpdateComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    SharedModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  providers: [],
  exports: [AppComponent],
})
export class CoreModule {}
