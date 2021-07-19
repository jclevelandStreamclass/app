import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode } from 'src/app/episodes/models/episode';
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
  //TODO check !

  constructor(
    private route: ActivatedRoute,
    private seriesModel: SeriesService
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
        console.log(this.episodes);

        this.seriesModel.getSportsPlayerById(s.sportsPlayerId).subscribe((sp) => {
        this.sportsPlayer = sp;
        console.log(this.sportsPlayer);
          });
      });
    }
  }
}
