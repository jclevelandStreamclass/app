import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Episode } from '../models/episode';
import { Totaltime } from '../models/totaltime';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Episode[]> {
    return this.http
      .get<Episode[]>(`${this.url}/episodes`)
      .pipe(map((episodes) => episodes.map((e) => new Episode(e))));
  }

  getDuration(searchserieId: string): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}/episodes/totaltime/${searchserieId}`
    );
    // .pipe(
    //   map(ar => {
    //     ar.map((ob) => {
    //       new Totaltime(ob);
    //     });
    //   })
    // );
  }
}
