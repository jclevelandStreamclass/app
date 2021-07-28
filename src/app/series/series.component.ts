import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from './models/serie';
import { SeriesService } from './services/series.service';
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
  series: Serie[] = [];

  constructor(private serviceModel: SeriesService, private router: Router) {}

  ngOnInit(): void {
    this.serviceModel.getSeries().subscribe((result) => {
      this.series = result;
    });
  }

  checkRoute(): boolean {
    return this.router.url === '/landing' || this.router.url === '/home';
  }
}
