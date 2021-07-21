import {
  Input,
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-series-grid-landing',
  templateUrl: './series-grid-landing.component.html',
  styleUrls: ['./series-grid-landing.component.scss'],
})
export class SeriesGridLandingComponent implements OnInit, OnChanges {
  @Input() series: Serie[] = [];
  // seriesPintar: Serie[] = [];
  // randomNumber!: number;

  constructor(private router: Router) {}
  ngOnInit(): void {}
  random = () => Math.random() - 0.5;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.series) {
      //console.log(this.series.sort(this.random));
    }
  }

  select(serieId: string): void {
    console.log(serieId);
    if (serieId) {
      this.router.navigate(['series', serieId]);
    }
  }
}
