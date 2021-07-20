import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from './interface/menu-logged';


@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.scss']
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
      label: 'CATEGORÍAS',
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
      showOnTablet: false,
      showOnDesktop: true,
      path: '#',
   },
    
  ];

  avatar: string | undefined = this.authServiceModel.user?.avatar;
  constructor(private router: Router, private authServiceModel: AuthService) { }

  ngOnInit(): void {
  }

   // checkea para incluir volver
  checkRoute(): boolean {
    return  this.router.url === '/login' ||  this.router.url.includes('/signup');
  }

  // checkea para incluir opciones de categorías e inicio de sesión
  checkRouteLanding(): boolean {
    return !this.router.url.includes('/login') &&  !this.router.url.includes('/signup');
  }

  getUserAvatar(): string | undefined {
    return this.authServiceModel.user?.avatar;
  }
  

}
