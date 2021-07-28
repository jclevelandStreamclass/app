import { Component, OnInit } from '@angular/core';
import { Category } from '../categories/interface/category.model';
import { SportsPlayer } from '../sportsplayers/models/sportsPlayer';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  categories: Category[] = [];
  sportsPlayers: SportsPlayer[] = [];
  showCategories = false;
  showSportsPlayers = true;
  constructor(private adminModel: AdminService) {}

  ngOnInit(): void {
    this.adminModel.getAllSportsPlayers().subscribe((result) => {
      this.sportsPlayers = result;
      console.log(this.sportsPlayers);
    });
  }

  sportsPlayerClick() {
    if (this.showCategories) {
      this.showSportsPlayers = !this.showSportsPlayers;
      this.showCategories = !this.showCategories;
    }
  }

  categoriesClick() {
    if (this.showSportsPlayers) {
      this.showSportsPlayers = !this.showSportsPlayers;
      this.showCategories = !this.showCategories;
    }
  }
  deleteClick(id: string) {}
  editClick(id: string) {}
}
