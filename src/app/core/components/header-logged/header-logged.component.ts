import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteTrigger,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Serie } from 'src/app/series/models/serie';
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
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'home',
    },
    {
      label: 'MIS CLASES',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'series',
    },
    {
      label: 'DEPORTES',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'categories',
    },
    {
      label: '',
      icon: 'search',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      path: '#',
    },
  ];

  formControl = new FormControl();
  autoFilter!: Observable<string[]>;
  sportsplayer!: SportsPlayer[];
  series: Serie[] = [];
  seriesBySportPlayerName!: string[];
  filterSportPlayer!: string;
  filterValue: string = '';

  avatar: string | undefined = this.authServiceModel.user?.avatar;
  constructor(
    private router: Router,
    private authServiceModel: AuthService,
    private sportsPlayerService: SportsplayerService
  ) {}

  ngOnInit(): void {}

  // checkea para incluir volver
  checkRoute(): boolean {
    return this.router.url === '/login' || this.router.url.includes('/signup');
  }

  // checkea para incluir opciones de categorías e inicio de sesión
  checkRouteLanding(): boolean {
    return (
      !this.router.url.includes('/login') &&
      !this.router.url.includes('/signup')
    );
  }

  getUserAvatar(): Observable<string | undefined> {
    return this.authServiceModel.getUser$().pipe(map((user) => user?.avatar));
  }

  filterSport(event: Event): void {
    const data = (<HTMLInputElement>event.target).value;
    if (data) {
      this.filterSportPlayer = data;
      console.log(this.filterSportPlayer);
      this.seriesSportsPlayer(this.filterSportPlayer);
    }
  }

  seriesSportsPlayer(data: string): void {
    this.sportsPlayerService.getSportsPlayerSeries(data).subscribe((result) => {
      this.sportsplayer = result;
      // console.log(this.sportsplayer);
      this.series = this.sportsplayer[0].series;
      this.seriesBySportPlayerName = this.series.map((serie) => serie.title);
      console.log(this.seriesBySportPlayerName);
      this.formControl.setValue('');
    });
    this.autoFilter = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.mat_filter(value))
    );
  }

  private mat_filter(value: string): string[] {
    this.filterValue = value.toLowerCase();
    return this.seriesBySportPlayerName.filter((option) =>
      option.toLowerCase().includes(this.filterValue)
    );
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

  // private setValue(value: string | null): void {
  //   if (typeof value === 'string') {
  //     this.mat_filter = 'a tomar por culo el ejercicio';
  //   } else {
  //     this.mat_filter = value;
  //   }
  // }
}
