import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-series-cards',
  templateUrl: './series-cards.component.html',
  styleUrls: ['./series-cards.component.scss']
})
export class SeriesCardsComponent implements OnInit {

  @Input() series: Serie[] = [];
  // seriesCard: Serie[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  select(serieId: string): void {
    console.log(serieId);
    if (serieId) {
      this.router.navigate(['series', serieId]);
    }
  }
}
