import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './interface/category.model';
import { CategoriesService } from './services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categorySvc: CategoriesService, private router: Router) {}

  ngOnInit(): void {
    this.categorySvc.getCategory().subscribe((x) => {
      this.categories = x;
    });
  }
  checkRoute(): boolean {
    return this.router.url === '/landing';
  }
}
