import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../interface/category.model';

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss'],
})
export class CategoriesGridComponent implements OnInit, OnChanges {
  @Input() categories: Category[] = [];

  constructor(private router : Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.categories){
    //   this.categories = [...changes.categories.currentValue]
    // }
  }

  ngOnInit(): void {}

  select(categoryId: string): void {
    console.log(categoryId)
    if (categoryId) {
      this.router.navigate(['category/series', categoryId]);
    }
  }
}
