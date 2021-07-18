import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './interface/menu-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      label: 'CATEGORÍAS',
      // icon: 'help',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'categories',
    },
    {
      label: 'INICIAR SESIÓN',
      // icon: 'login',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      path: 'login',
    },
  ];

  constructor(private router: Router) {

  }

  ngOnInit(): void {}

  // checkea para incluir volver
  checkRoute(): boolean {
    return  this.router.url === '/login' ||  this.router.url.includes('/signup');
  }

  // checkea para incluir opciones de categorías e inicio de sesión
  checkRouteLanding(): boolean {
    return !this.router.url.includes('/login') &&  !this.router.url.includes('/signup');
  }
}
