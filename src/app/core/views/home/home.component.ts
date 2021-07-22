import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from 'src/app/episodes/models/episode';
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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.homeModel.getSerieById(this.featuredSerieId).subscribe((fSerie) => {
      this.featuredSerie = fSerie;
      this.episodes = [...fSerie.episodes];
      this.firstvideo = this.episodes[0].video;
    });
  }
  playFirstVideo(featuredSerieId: string): void {
    if (this.authService.hasUserRole('premium')) {
      console.log('premium');
      if (this.firstvideo) {
        console.log('firstvideo');
        this.router.navigate(['/episodes', this.firstvideo]);
      }
    } else {
      //TODO redirect to payment page ahora redirige al serie-intro
      this.router.navigate(['/series', this.featuredSerieId]);
    }
  }
}
