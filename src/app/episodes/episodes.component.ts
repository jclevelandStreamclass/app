import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { ToastMessagesService } from '../core/services/toast-messages.service';
import { Episode } from './models/episode';
import { EpisodesService } from './services/episodes.service';

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
    private authService: AuthService,
    private toastMessage: ToastMessagesService
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
    // CHECKEO EN FRONT:SOLO EN CASO DE SER PREMIUM NAVEGA AL VIDEO
    if (!this.authService.hasUserRole('premium')) {
      this.router.navigate(['userPayment']);
      this.toastMessage.showInfo('Únete a nuestro servicio Premium');
    } else if (id) {
      this.episodeModel.getEpisodeById(id).subscribe((episode) => {
        this.video = episode.video;
        this.router.navigate(['episodes', this.video]);
      });
    }
  }
}
