import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Serie } from 'src/app/series/models/serie';
import { SeriesService } from 'src/app/series/services/series.service';
import { Category } from '../interface/category.model';
import { CategoriesService } from '../services/categories.service';


@Component({
  selector: 'app-categories-series-page',
  templateUrl: './categories-series-page.component.html',
  styleUrls: ['./categories-series-page.component.scss']
})


export class CategoriesSeriesPageComponent implements OnInit, OnChanges {
  categoryId : string = '';
  serie: Serie[] = []

  constructor(route: ActivatedRoute, private seriesModel: SeriesService ) {
    route.params.subscribe((params) => {
      console.log(params)
      this.categoryId = params.category || '';
      console.log(this.categoryId)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.serie){
      this.serie = [...changes.serie.currentValue]
    }
  }

  ngOnInit(): void {
      //this.categorySvc.getCategoryById(this.categoryId).subscribe(x=>{this.category = x})
      this.seriesModel.getSeriesByCategoryId(this.categoryId).subscribe(res=>{
        this.serie = res;
      })
}

}
