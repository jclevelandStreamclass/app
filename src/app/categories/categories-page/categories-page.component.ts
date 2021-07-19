import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Category } from '../interface/category.interface';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnChanges {

  categories: Category[] = []
  constructor(private categorySvc: CategoriesService, private router: Router) {
   }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.categories){
      this.categories = [...changes.categories.currentValue]
    }
  }

  ngOnInit(): void {
    this.categorySvc.getCategory().subscribe(x => {this.categories = x});
    console.log(this.categories)
  }

  select(category: string): void {
    console.log(category)
    if (category) {
      this.router.navigate(['categories', category]);
    }
  }
}
