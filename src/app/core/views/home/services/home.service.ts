import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serie } from 'src/app/series/models/serie';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSerieById(id: string): Observable<Serie> {
    return this.http
      .get<Serie>(`${this.url}/series/${id}`)
      .pipe(map((x) => new Serie(x)));
  }
}
