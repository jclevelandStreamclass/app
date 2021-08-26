import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serie } from 'src/app/series/models/serie';
import { Category } from '../interface/category.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiURL = environment.url;

  constructor(private http: HttpClient) {}

  getCategory(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.apiURL}/categories/all`)
      .pipe(map((x) => x.map((s) => new Category(s))));
  }

  getCategoryLatestUpdate(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.apiURL}/categories/latest/update`)
      .pipe(map((x) => x.map((s) => new Category(s))));
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURL}/categories/${id}`);
  }

  getSerieById(id: string): Observable<Serie | null> {
    if (id) {
      return this.http
        .get<Serie>(`${this.apiURL}/series/${id}`)
        .pipe(map((sp) => new Serie(sp)));
    }
    return of(null);
  }
}
