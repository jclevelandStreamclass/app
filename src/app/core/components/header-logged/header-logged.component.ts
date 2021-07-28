import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteTrigger,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { SportsPlayer } from 'src/app/sportsplayers/models/sportsPlayer';
import { SportsplayerService } from 'src/app/sportsplayers/services/sportsplayer.service';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from './interface/menu-logged';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.scss'],
})
export class HeaderLoggedComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'INICIO',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'home',
    },
    {
      label: 'MIS CLASES',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'series',
    },
    {
      label: 'DEPORTES',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'categories',
    },
  ];

  formControl = new FormControl();
  autoFilter!: Observable<{ name: string; id: string }[]>;
  sportsplayer!: SportsPlayer[];

  avatar: string | undefined = this.authServiceModel.user?.avatar;
  constructor(
    private router: Router,
    private authServiceModel: AuthService,
    private sportsPlayerService: SportsplayerService
  ) {}

  ngOnInit(): void {
    this.autoFilter = this.formControl.valueChanges.pipe(
      filter((value) => !!value),
      debounceTime(500),
      switchMap((value) =>
        this.sportsPlayerService.getSportsPlayerSeries(value)
      ),
      map((players) =>
        players.map(({ name, series }) => ({
          name,
          id: series[0]?.id,
        }))
      )
    );
  }

  // Header login/signup
  checkRoute(): boolean {
    return this.router.url === '/login' || this.router.url.includes('/signup');
  }

  // Header con transparencia usuario logeado
  checkRouteHome(): boolean {
    return this.router.url === '/home';
  }

  // Header landing usuario no logeado
  checkRouteLanding(): boolean {
    return (
      !this.router.url.includes('/login') &&
      !this.router.url.includes('/signup')
    );
  }

  getUserAvatar(): Observable<string | undefined> {
    return this.authServiceModel.getUser$().pipe(map((user) => user?.avatar));
  }

  resetAutoInput(
    optVal: string,
    trigger: MatAutocompleteTrigger,
    auto: MatAutocomplete
  ) {
    setTimeout(() => {
      auto.options.forEach((item) => {
        item.deselect();
      });
      this.formControl.reset('');
      trigger.openPanel();
    }, 100);
  }
}
