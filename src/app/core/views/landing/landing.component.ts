import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/categories/interface/category.interface';
import { CategoriesService } from 'src/app/categories/services/categories.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  
  categories!: Category[];
  constructor(private categorySvc: CategoriesService) { }

  ngOnInit(): void {
    this.categorySvc.getCategory().subscribe(x => {this.categories = x});
    console.log(this.categories)
  }
  

}
