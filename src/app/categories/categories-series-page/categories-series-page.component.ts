import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-series-page',
  templateUrl: './categories-series-page.component.html',
  styleUrls: ['./categories-series-page.component.scss']
})
export class CategoriesSeriesPageComponent implements OnInit {
  category : string = '';

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.category = params.category || '';
    });
  }

  ngOnInit(): void {
  }
 
}
