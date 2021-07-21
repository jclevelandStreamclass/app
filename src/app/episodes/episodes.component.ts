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

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit, OnChanges {
  dataSource = new MatTableDataSource<Episode>([]);
  displayedColumns: string[] = ['photo', 'title'];
  @Input() episodes: Episode[] = [];

  constructor(private episodeModel: EpisodesService, private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.episodes) {
      this.dataSource.data = [...changes.episodes.currentValue];
    }
  }

  ngOnInit(): void {
    this.dataSource.data = [...this.episodes];
  }

  select(video: string): void {
    if (video) {
      this.router.navigate(['episodes', video]);
    }
  }
}
