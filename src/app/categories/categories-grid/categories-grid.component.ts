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
export class CategoriesGridComponent implements OnInit {
  @Input() categories: Category[] = [];

  constructor(private router : Router) {}


  ngOnInit(): void {
  }

  select(categoryId: string): void {
    console.log(categoryId)
    if (categoryId) {
      this.router.navigate(['category/series', categoryId]);
    }
  }
}
