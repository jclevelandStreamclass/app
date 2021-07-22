import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Category } from '../interface/category.model';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit, OnChanges {
  @Input() categories: Category[] = [];
  constructor(
    private categorySvc: CategoriesService,
    private router: Router,
    private authModelService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categories) {
      this.categories = [...changes.categories.currentValue];
    }
  }

  ngOnInit(): void {
    this.categorySvc.getCategory().subscribe((x) => {
      this.categories = x;
    });
    console.log(this.categories);
  }

  select(categoryId: string): void {
    console.log(categoryId);
    if (categoryId) {
      this.router.navigate(['category/series', categoryId]);
    }
  }

  isLogged(): boolean {
    return this.authModelService.isUserAuthenticated;
  }
}
