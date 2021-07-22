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

  random = () => Math.random() - 0.5;

  select(serieId: string): void {
    console.log(serieId);
    if (serieId) {
      this.router.navigate(['series', serieId]);
    }
  }
}
