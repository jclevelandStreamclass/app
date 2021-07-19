import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Serie } from 'src/app/series/models/serie';
import { SeriesService } from 'src/app/series/services/series.service';

@Component({
  selector: 'app-categories-series-page',
  templateUrl: './categories-series-page.component.html',
  styleUrls: ['./categories-series-page.component.scss']
})
export class CategoriesSeriesPageComponent implements OnInit, OnChanges {
  category : string = '';
  series: Serie[] = []

  constructor(route: ActivatedRoute, private categorySvc: SeriesService) {
    route.params.subscribe((params) => {
      this.category = params.category || '';
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.series){
      this.series = [...changes.series.currentValue]
    }
  }

  ngOnInit(): void {
    this.categorySvc.getSeries().subscribe(x => {this.series = x});
    console.log(this.series)
  }
 
}
