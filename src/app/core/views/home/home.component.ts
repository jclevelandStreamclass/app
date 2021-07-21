import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Serie } from 'src/app/series/models/serie';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //TODO implement a named featured series
  featuredSerieId: string = '';
  featuredSerie!: Serie;
  constructor(
    route: ActivatedRoute,
    router: Router,
    private homeModel: HomeService
  ) {}

  ngOnInit(): void {
    this.homeModel.getSerieById(this.featuredSerieId).subscribe((fs) => {
      this.featuredSerie = fs;
    });
  }
}
