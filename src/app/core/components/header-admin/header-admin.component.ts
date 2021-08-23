import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';

import { SportsPlayer } from '../../../sportsplayers/models/sportsPlayer';
import { SportsplayerService } from '../../../sportsplayers/services/sportsplayer.service';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from './interface/menu-logged';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
})
export class HeaderLoggedAdminComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'home',
    },
    {
      label: 'Categorías',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'admin/categories',
    },
    {
      label: 'Deportistas',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'admin/players',
    },
    {
      label: 'Usuarios',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'admin/users',
    }
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

}
