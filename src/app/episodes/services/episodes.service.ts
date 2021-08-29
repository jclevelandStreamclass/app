import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';
import { Episode } from '../models/episode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  url = environment.url;
  constructor(
    private http: HttpClient,
    private toastMessages: ToastMessagesService,
    private router: Router
  ) {}

  getAll(): Observable<Episode[]> {
    return this.http
      .get<Episode[]>(`${this.url}/episodes`)
      .pipe(map((episodes) => episodes.map((e) => new Episode(e))));
  }

  getDuration(searchserieId: string): Observable<{ total_time: string }[]> {
    return this.http.get<any[]>(
      `${this.url}/episodes/totaltime/${searchserieId}`
    );
  }

  getEpisodeById(id: string): Observable<any> {
    return this.http
      .get<Episode>(`${this.url}/episodes/private/${id}`, {
        observe: 'response',
      })
      .pipe(
        map((episodeById) => {
          return new Episode(episodeById.body);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.toastMessages.showInfo('Únete a nuestro servicio Premium');
            this.router.navigate(['/userPayment']);
          }
          return of(null);
        })
      );
  }
}
