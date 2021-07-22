import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Serie } from 'src/app/series/models/serie';
import { SeriesService } from 'src/app/series/services/series.service';
import { Category } from '../interface/category.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories-series-page',
  templateUrl: './categories-series-page.component.html',
  styleUrls: ['./categories-series-page.component.scss'],
})
export class CategoriesSeriesPageComponent implements OnInit, OnChanges {
  categoryId: string = '';
  @Input() serie: Serie[] = [];
  category!: Category;

  constructor(
    route: ActivatedRoute,
    private seriesModel: SeriesService,
    private categoryModel: CategoriesService,
    private router: Router,
    private authModelService: AuthService
  ) {
    route.params.subscribe((params) => {
      this.categoryId = params.category || '';
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.serie) {
      this.serie = [...changes.serie.currentValue];
    }
  }

  ngOnInit(): void {
    this.seriesModel.getSeriesByCategoryId(this.categoryId).subscribe((res) => {
      this.serie = res;
    });
    this.categoryModel.getCategoryById(this.categoryId).subscribe((res) => {
      this.category = res;
      console.log('this.category is ' + this.category.name);
    });
  }

  select(serieId: string): void {
    console.log(serieId);
    if (serieId) {
      this.router.navigate(['/series', serieId]);
    }
  }

  isLogged(): boolean {
    return this.authModelService.isUserAuthenticated;
  }
}
