import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Category } from '../interface/category.interface';

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss'],
})
export class CategoriesGridComponent implements OnInit, OnChanges {
  @Input() categories: Category[] = [];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.categories){
    //   this.categories = [...changes.categories.currentValue]
    // }
  }

  ngOnInit(): void {}
}
