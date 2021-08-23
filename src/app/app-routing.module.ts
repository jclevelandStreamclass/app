import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './categories/categories-page/categories-page.component';
import { CategoriesSeriesPageComponent } from './categories/categories-series-page/categories-series-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AuthGuard } from './core/services/auth.guard';
import { AuthGuardAdmin } from './core/services/authAdmin.guard';
import { HomeComponent } from './core/views/home/home.component';
import { LandingComponent } from './core/views/landing/landing.component';
import { LoginComponent } from './core/views/login/login.component';
import { ProfileComponent } from './core/views/profile/profile.component';
import { SignupComponent } from './core/views/signup/signup.component';
import { UserpaymentComponent } from './core/views/userpayment/userpayment.component';
import { EpisodesStreamComponent } from './episodes/episodes-stream/episodes-stream.component';
import { SeriesIntroComponent } from './series/series-cards/series-intro/series-intro.component';
import { SeriesComponent } from './series/series.component';
import { CategoriaAdminComponent } from './admin/categoria-admin/categoria-admin.component';
import { UserAdminComponent } from './admin/user-admin/user-admin.component';
import { UserDetailsComponent } from './admin/user-details/user-details.component';
import { SportPlayersComponent } from './admin/sport-players/sport-players.component';
import { SportPlayersDetailComponent } from './admin/sport-players-detail/sport-players-detail.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard,AuthGuardAdmin],
    children: [
      {
        path: '',
        component: CategoriaAdminComponent,
      },
      {
        path: 'categories',
        component: CategoriaAdminComponent
      },
      {
        path: 'users',
        component: UserAdminComponent
      },
      {
        path: 'users/:id',
        component: UserDetailsComponent
      },
      {
        path: 'players',
        component: SportPlayersComponent
      },
      {
        path: 'players/:id',
        component: SportPlayersComponent
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/:activate',
    component: LoginComponent,
  },
  {
    path: 'categories',
    component: CategoriesPageComponent,
  },

  {
    path: 'series',
    component: SeriesComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signup/:userEmail',
    component: SignupComponent,
  },
  {
    path: 'episodes/:video',
    component: EpisodesStreamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'series/:serieId',
    component: SeriesIntroComponent,
  },
  {
    path: 'series/latest/update',
    component: SeriesComponent,
  },
  {
    path: 'category/series/:category',
    component: CategoriesSeriesPageComponent,
  },
  {
    path: 'categories/latest/update',
    component: CategoriesComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userPayment',
    component: UserpaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
