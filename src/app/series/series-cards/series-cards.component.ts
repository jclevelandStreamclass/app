import { Component, Input, OnInit } from '@angular/core';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-series-cards',
  templateUrl: './series-cards.component.html',
  styleUrls: ['./series-cards.component.scss']
})
export class SeriesCardsComponent implements OnInit {

  @Input() series: Serie[] = [];
  // seriesCard: Serie[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
