import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu: boolean = false;
  div!: HTMLDivElement;

  constructor(private router: Router, private observer: BreakpointObserver) {}

  ngOnInit(): void {}

  checkRoute(): boolean {
    return this.router.url === '/login' || this.router.url === '/signup';
  }

  checkRouteLanding(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/signup';
  }
}
