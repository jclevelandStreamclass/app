import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class SeriesIntroComponent {
  serieId: string = '';
  series!: Serie;
  episodes: Episode[] = [];
  sportsPlayer!: SportsPlayer | null;
  totaltime: string = '';

  viewModel$ = this.route.params.pipe(
    switchMap((params) => this.seriesModel.getSerieById(params.serieId)),
    tap((serie) => {
      this.series = serie;
      this.episodes = [...serie.episodes];
    }),
    switchMap((serie) =>
      this.seriesModel.getSportsPlayerById(serie.sportsPlayerId)
    ),
    tap((sportsPlayer) => (this.sportsPlayer = sportsPlayer)),
    switchMap(() => this.episodesModel.getDuration(this.series.id)),
    tap(([totalTime]) => {
      this.calculateTotaltime(totalTime);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private seriesModel: SeriesService,
    private episodesModel: EpisodesService,
    private authServiceModel: AuthService
  ) {}

  isLogged(): boolean {
    return this.authServiceModel.isUserAuthenticated;
  }

  isPremium(): boolean {
    return this.authServiceModel.hasUserRole('premium');
  }

  private calculateTotaltime(totalTimeRaw: { total_time: string }): void {
    let totaltimeString = new Totaltime(totalTimeRaw).total_time;
    totaltimeString = totaltimeString.replace(':', 'h ');
    totaltimeString = totaltimeString.substring(0, 6) + 'min ';
    this.totaltime = totaltimeString;
  }
}
