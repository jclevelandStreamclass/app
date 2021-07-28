import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/categories/interface/category.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit, OnChanges {
  @Input() categories: Category[] = [];
  @Output() deleteCategory = new EventEmitter<string>();
  @Output() editCategory = new EventEmitter<string>();
  dataSource = new MatTableDataSource<Category>([]);
  displayedColumns: string[] = ['name', 'photo', 'actions'];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categories) {
      this.dataSource.data = [...changes.categories.currentValue];
      console.log(this.categories);
    }
  }

  ngOnInit(): void {}
}
