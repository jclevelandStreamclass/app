import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
}
