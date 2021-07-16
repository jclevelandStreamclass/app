import { Component, OnInit } from '@angular/core';
import { Episode } from './models/episode';
import { EpisodesService } from './services/episodes.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {
  dataSource = new MatTableDataSource<Episode>([]);
  displayedColumns: string[] = ['photo', 'title'];
  constructor(private episodeModel: EpisodesService, private router: Router) {}

  ngOnInit(): void {
    this.episodeModel.getAll().subscribe((episodes) => {
      this.dataSource.data = episodes.map((x) => ({ ...x }));
    });
  }

  select(video: string): void {
    if (video) {
      this.router.navigate(['login', video]);
    }
  }
}
