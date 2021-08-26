import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serie } from 'src/app/series/models/serie';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private url = environment.url;
  
  constructor(private http: HttpClient) {}

  getSerieById(id: string): Observable<Serie> {
    return this.http
      .get<Serie>(`${this.url}/series/${id}`)
      .pipe(map((x) => new Serie(x)));
  }
}
