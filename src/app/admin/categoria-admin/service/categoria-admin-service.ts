import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserModel } from 'src/app/models/user';
import { environment } from '../../../../environments/environment';


//import { Category } from '../interface/category.model';

class Category {
  id: string;
  name: string;
  photo: string;
  series: [];
  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.name = item?.name ?? '';
    this.photo = item?.photo ?? '';
    this.series = item?.serie ?? [];
  }
}

@Injectable({
  providedIn: 'root',
})
export class ServiceCategoryAdmin {
  private URL = environment.url + '/admin/categories';
  constructor(
    private http: HttpClient
  ) {
    }

  getCategories(): Observable<Category[]> { 

    return this.http.get<Category[]>(`${this.URL}`)
      .pipe(map((x) => x.map((s) => new Category(s))));
  }
}
