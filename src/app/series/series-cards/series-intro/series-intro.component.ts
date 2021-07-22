import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Episode } from 'src/app/episodes/models/episode';
import { Totaltime } from 'src/app/episodes/models/totaltime';
import { EpisodesService } from 'src/app/episodes/services/episodes.service';
import { SportsPlayer } from 'src/app/sportsplayers/models/sportsPlayer';
import { Serie } from '../../models/serie';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-series-intro',
  templateUrl: './series-intro.component.html',
  styleUrls: ['./series-intro.component.scss'],
})
export class SeriesIntroComponent implements OnInit {
  serieId: string = '';
  series!: Serie;
  episodes: Episode[] = [];
  sportsPlayer!: SportsPlayer | null;
  totaltime: string = '';
  //TODO check !
  viewModel$!: Observable<{ total_time: string }[]>;

  constructor(
    private route: ActivatedRoute,
    private seriesModel: SeriesService,
    private episodesModel: EpisodesService,
    private authServiceModel: AuthService
  ) {
    route.params.subscribe((params) => {
      this.serieId = params.serieId || '';
    });
  }

  ngOnChanges(): void {}

  ngOnInit(): void {
    if (!this.serieId) {
      // PONER UN GUARDA
      return;
    }

    // TAP --> efecto secundario -> rxjs evita tener que hacer un subscribe
    // Observable --> (SOLO 1 VEZ)
    // switchMap -> te suscribes detnro de la tubería, y lanza otro observable, mapea lo que hay dentro por otra cosa
    this.viewModel$ = this.seriesModel.getSerieById(this.serieId).pipe(
      tap((serie) => {
        this.series = serie;
        this.episodes = [...serie.episodes];
      }),
      switchMap((serie) =>
        this.seriesModel.getSportsPlayerById(serie.sportsPlayerId)
      ),
      tap((sportsPlayer) => (this.sportsPlayer = sportsPlayer)),
      switchMap(() => this.episodesModel.getDuration(this.serieId)),
      tap(([totalTime]) => {
        let tt2 = new Totaltime(totalTime).total_time;
        tt2 = tt2.replace(':', 'h ');
        tt2 = tt2.substring(0, 6) + 'min ';
        this.totaltime = tt2;
      })
    );

    // this.seriesModel.getSerieById(this.serieId).subscribe((s) => {
    //   this.series = s;
    //   this.episodes = [...s.episodes];

    //   this.seriesModel
    //     .getSportsPlayerById(s.sportsPlayerId)
    //     .subscribe((sp) => {
    //       this.sportsPlayer = sp;
    //     });

    //   this.episodesModel.getDuration(this.serieId).subscribe((tt) => {
    //     let tt2 = new Totaltime(tt[0]).total_time;
    //     tt2 = tt2.replace(':', 'h ');
    //     tt2 = tt2.substring(0, 6) + 'min ';
    //     this.totaltime = tt2;
    //   });
    // });
  }

  isLogged(): boolean {
    return this.authServiceModel.isUserAuthenticated;
  }
}
