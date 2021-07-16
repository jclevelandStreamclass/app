import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './categories/categories-page/categories-page.component';
import { LandingComponent } from './core/views/landing/landing.component';
import { LoginComponent } from './core/views/login/login.component';
import { SignupComponent } from './core/views/signup/signup.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
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
    component: EpisodesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
