import { Input, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-series-grid-landing',
  templateUrl: './series-grid-landing.component.html',
  styleUrls: ['./series-grid-landing.component.scss'],
})
export class SeriesGridLandingComponent implements OnInit {
  @Input() series: Serie[] = [];

  constructor(private router: Router) {}
  ngOnInit(): void {}

  select(category: string): void {
    console.log(category);
    if (category) {
      this.router.navigate(['series', category]);
    }
  }
}
