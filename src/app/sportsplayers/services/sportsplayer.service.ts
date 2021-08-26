import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SportsPlayer } from '../models/sportsPlayer';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SportsplayerService {
  private url = environment.url;

  constructor(private http: HttpClient) {}

  getSportsPlayerSeries(name: string): Observable<SportsPlayer[]> {
    return this.http
      .get<SportsPlayer[]>(`${this.url}/sportsPlayer/search?name=${name}`)
      .pipe(map((data) => data.map((x) => new SportsPlayer(x))));
  }
}
