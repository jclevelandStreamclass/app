import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/categories/interface/category.model';
import { SportsPlayer } from 'src/app/sportsplayers/models/sportsPlayer';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAllSportsPlayers(): Observable<SportsPlayer[]> {
    return this.http
      .get<SportsPlayer[]>(`${this.url}/sportsPlayer`)
      .pipe(
        map((sportsPlayers) => sportsPlayers.map((sp) => new SportsPlayer(sp)))
      );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.url}/categories/all`)
      .pipe(map((categories) => categories.map((c) => new Category(c))));
  }
}
