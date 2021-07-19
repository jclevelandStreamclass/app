import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private seriesModel: SeriesService,
    private episodesModel: EpisodesService
  ) {
    route.params.subscribe((params) => {
      this.serieId = params.serieId || '';
    });
  }

  ngOnChanges(): void {}

  ngOnInit(): void {
    if (this.serieId) {
      this.seriesModel.getSerieById(this.serieId).subscribe((s) => {
        this.series = s;
        this.episodes = [...s.episodes];

        this.seriesModel
          .getSportsPlayerById(s.sportsPlayerId)
          .subscribe((sp) => {
            this.sportsPlayer = sp;
          });
        console.log(this.serieId);
        this.episodesModel.getDuration(this.serieId).subscribe((tt) => {
          let tt2 = new Totaltime(tt[0]).total_time;
          tt2 = tt2.replace(':', 'h ');
          tt2 = tt2.substring(0, 6) + 'min ';
          this.totaltime = tt2;
          console.log(this.totaltime);
        });
      });
    }
  }
}
