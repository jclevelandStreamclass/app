import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class CategoriesSeriesPageComponent implements OnInit {
  categoryId: string = '';
  serie: Serie[] = [];
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

  ngOnInit(): void {
    this.seriesModel.getSeriesByCategoryId(this.categoryId).subscribe((res) => {
      this.serie = [...res];
    });
    this.categoryModel.getCategoryById(this.categoryId).subscribe((res) => {
      this.category = res;
    });
  }

  select(serieId: string): void {
    if (serieId) {
      this.router.navigate(['/series', serieId]);
    }
  }

  isPremiumUser(): boolean {
    return this.authModelService.hasUserRole('premium');
  }
}
