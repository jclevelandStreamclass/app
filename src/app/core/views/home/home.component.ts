import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from 'src/app/episodes/models/episode';
import { EpisodesService } from 'src/app/episodes/services/episodes.service';
import { Serie } from 'src/app/series/models/serie';
import { AuthService } from '../../services/auth.service';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //TODO implement a named featured series
  featuredSerieId: string = '1';
  featuredSerie!: Serie;
  episodes: Episode[] = [];
  firstvideo: string = '';

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private homeModel: HomeService,
    private authService: AuthService,
    private episodeService: EpisodesService
  ) {}

  ngOnInit(): void {
    this.homeModel.getSerieById(this.featuredSerieId).subscribe((fSerie) => {
      this.featuredSerie = fSerie;
      this.episodes = [...fSerie.episodes];
      this.firstvideo = this.episodes[0].id;
      console.log(this.firstvideo);
      console.log(fSerie);
    });
  }
  playFirstVideo(event: Event): void {
    if (this.authService.hasUserRole('premium')) {
      event.stopPropagation();
      console.log('premium');
      if (this.firstvideo) {
        const video = this.episodeService
          .getEpisodeById(this.firstvideo)
          .subscribe((episode) => {
            this.router.navigate(['/episodes', episode.video]);
          });
        console.log(video);
      }
    } else {
      //TODO redirect to payment page ahora redirige al serie-intro
      //TODO bubbling
      this.router.navigate(['/userPayment']);
    }
  }
}
