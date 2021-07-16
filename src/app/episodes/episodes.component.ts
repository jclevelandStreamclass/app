import { Component, OnInit } from '@angular/core';
import { Episode } from './models/episode';
import { EpisodesService } from './services/episodes.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {
  dataSource = new MatTableDataSource<Episode>([]);
  displayedColumns: string[] = ['title', 'duration', 'photo', 'number'];
  constructor(private episodeModel: EpisodesService) {}

  ngOnInit(): void {
    this.episodeModel.getAll().subscribe((episodes) => {
      this.dataSource.data = episodes.map((x) => ({ ...x }));
    });
  }
}
