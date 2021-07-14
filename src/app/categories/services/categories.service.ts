import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiURL= 'http://localhost:3000/categories/all'

  constructor(private http: HttpClient) { }

  getCategory():Observable<any>{
    return this.http.get<Category[]>(this.apiURL).pipe(
      map(x => x.map(s => new Category(s)))
    );
  }
}
