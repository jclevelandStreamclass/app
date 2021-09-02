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

class Player {
  id: string;
  name: string;
  photo: string;
  bio: string;
  job: string;
  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.name = item?.name ?? '';
    this.photo = item?.photo ?? '';
    this.job = item?.job ?? '';
    this.bio = item?.bio ?? '';
  }
}

@Injectable({
  providedIn: 'root',
})
export class ServiceSportPlayer {
  private URL = environment.url + '/admin/players';
  constructor(
    private http: HttpClient,
    private toastMessages: ToastMessagesService
  ) {
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<[]>(`${this.URL}`)
      .pipe(map((x) => x.map((s) => s)));
  }

  getPlayer(): Observable<Player[]> {
    return this.http.get<[]>(`${this.URL}`)
      .pipe(map((x) => x.map((s) => s)));
  }

  insertPlayer(player: Player): Observable<Player | null> {
    return this.http
      .post<Player>(`${this.URL}`, player, { observe: 'response' })
      .pipe(
        map((x) => new Player(x)),
        catchError((e: HttpErrorResponse) => {
          if (e.status === HttpStatusCode.InternalServerError) {
            this.toastMessages.showError('Hubo un error en el servidor');
          }
          return of(null);
        })
      );
  }

  deleteCategories(id: string): Observable<Player[]> {
    return this.http.delete<Player>(`${this.URL}/${id}`)
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

  updateplayer(id: string, form: FormData): Observable<any> {
  console.log("🚀 ~ file: sport-players-service.ts ~ line 82 ~ ServiceSportPlayer ~ updateplayer ~ form", form.get('name'))
    
    return this.http.put(`${this.URL}/${id}`, form).pipe(
      map((data) => {       
        this.toastMessages.showSuccessNoTime(`Información Actualizada`);
        return data;
      }),
      catchError((e: HttpErrorResponse) => {
        if (e.status === HttpStatusCode.InternalServerError) {
          this.toastMessages.showError(
            'Hubo un error en el servidor' + HttpStatusCode.InternalServerError
          );
        }
        console.log(e.message);
        return of(null);
      })
    );
  }

}
