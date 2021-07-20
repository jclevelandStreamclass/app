import { Input, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from '../models/serie';
import { SeriesService } from '../services/series.service';

@Component({
  selector: 'app-series-grid-landing',
  templateUrl: './series-grid-landing.component.html',
  styleUrls: ['./series-grid-landing.component.scss'],
})
export class SeriesGridLandingComponent implements OnInit {
  @Input() series: Serie[] = [];

  constructor(private router: Router, private serviceModel: SeriesService) {}
  ngOnInit(): void {
  }

  select(serieId: string): void {
    console.log(serieId);
    if (serieId) {
      this.router.navigate(['series', serieId]);
    }
  }
}
