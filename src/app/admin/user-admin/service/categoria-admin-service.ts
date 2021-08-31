import {
  HttpClient, HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';
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
    private http: HttpClient,
    private toastMessages: ToastMessagesService
  ) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<[]>(`${this.URL}`)
      .pipe(map((x) => x.map((s) => s)));
  }

  insertCategory(category: Category): Observable<Category | null> {
    return this.http
      .post<Category>(`${this.URL}`, category, { observe: 'response' })
      .pipe(
        map((x) => new Category(x)),
        catchError((e: HttpErrorResponse) => {
          if (e.status === HttpStatusCode.InternalServerError) {
            this.toastMessages.showError('Hubo un error en el servidor');
          }
          return of(null);
        })
      );
  }

  deleteCategories(id: string): Observable<Category[]> {
    return this.http.delete<Category>(`${this.URL}/${id}`)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          if (e.status === HttpStatusCode.InternalServerError) {
            console.log(
              'Error en el servidor',
              HttpStatusCode.InternalServerError
            );
            this.toastMessages.showError('Hubo un error en el servidor');
          }

          return of(null);
        }));
  }

}
