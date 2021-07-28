-import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './views/app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar/';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CategoriesGridComponent } from '../categories/categories-grid/categories-grid.component';
import { CategoriesPageComponent } from '../categories/categories-page/categories-page.component';
import { CategoriesComponent } from '../categories/categories.component';
import { SeriesCardsComponent } from '../series/series-cards/series-cards.component';
import { SeriesIntroComponent } from '../series/series-cards/series-intro/series-intro.component';
import { SeriesGridLandingComponent } from '../series/series-grid-landing/series-grid-landing.component';
import { SeriesComponent } from '../series/series.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './views/landing/landing.component';
import { SignupComponent } from './views/signup/signup.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { EpisodesComponent } from '../episodes/episodes.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoriesSeriesPageComponent } from '../categories/categories-series-page/categories-series-page.component';
import { SafePipePipe } from '../episodes/safe-pipe.pipe';
import { EpisodesStreamComponent } from '../episodes/episodes-stream/episodes-stream.component';
import { HeaderLoggedComponent } from './components/header-logged/header-logged.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserpaymentComponent } from './views/userpayment/userpayment.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AdminComponent } from '../admin/admin.component';
import { CategoriesListComponent } from '../admin/categories-list/categories-list.component';
import { SportsPlayerListComponent } from '../admin/sports-player-list/sports-player-list.component';
import { SeriesLastupdateComponent } from '../series/series-lastupdate/series-lastupdate.component';
import { CategoriesLatestUpdateComponent } from '../categories/categories-latest-update/categories-latest-update.component';

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
    AdminComponent,
    CategoriesListComponent,
    SportsPlayerListComponent,
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
