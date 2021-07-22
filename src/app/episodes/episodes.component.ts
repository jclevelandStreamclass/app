import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Episode } from './models/episode';
import { EpisodesService } from './services/episodes.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit, OnChanges {
  dataSource = new MatTableDataSource<Episode>([]);
  displayedColumns: string[] = ['photo', 'title'];
  video: string = '';
  @Input() episodes: Episode[] = [];

  constructor(
    private episodeModel: EpisodesService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.episodes) {
      this.dataSource.data = [...changes.episodes.currentValue];
    }
  }

  ngOnInit(): void {
    this.dataSource.data = [...this.episodes];
  }

  select(id: string): void {
    // SOLO EN CASO DE SER PREMIUM NAVEGA AL VIDEO
    if (this.authService.hasUserRole('premium')) {
      if (id) {
        this.episodeModel.getEpisodeById(id).subscribe((episode) => {
          console.log(episode);
          this.video = episode.video;
          this.router.navigate(['episodes', this.video]);
        });
        console.log(this.video);
      }
    } else {
      // TODO
      this.router.navigate(['landing']);
    }
  }
}
