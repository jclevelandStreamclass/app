import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Category } from '../interface/category.model';

@Component({
  selector: 'app-categories-latest-update',
  templateUrl: './categories-latest-update.component.html',
  styleUrls: ['./categories-latest-update.component.scss'],
})
export class CategoriesLatestUpdateComponent implements OnInit {
  @Input() categoriesUpdate: Category[] = [];

  constructor(private router: Router, private authModelService: AuthService) {}

  ngOnInit(): void {}

  select(categoryId: string): void {
    if (categoryId) {
      this.router.navigate(['category/series', categoryId]);
    }
  }

  isPremiumUser(): boolean {
    return this.authModelService.hasUserRole('premium');
  }

  // check authenticated for choose between 2 buttons
  checkAuthenticated(): boolean {
    return this.authModelService.isUserAuthenticated;
  }
}
