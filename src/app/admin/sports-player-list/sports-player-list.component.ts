import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SportsPlayer } from 'src/app/sportsplayers/models/sportsPlayer';

@Component({
  selector: 'app-sports-player-list',
  templateUrl: './sports-player-list.component.html',
  styleUrls: ['./sports-player-list.component.scss'],
})
export class SportsPlayerListComponent implements OnInit, OnChanges {
  @Input() sportsPlayers: SportsPlayer[] = [];
  @Output() deleteSportsPlayer = new EventEmitter<string>();
  @Output() editSportsPlayer = new EventEmitter<string>();
  dataSource = new MatTableDataSource<SportsPlayer>([]);
  displayedColumns: string[] = ['name', 'bio', 'job', 'photo', 'actions'];
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sportsPlayers) {
      this.dataSource.data = [...changes.sportsPlayers.currentValue];
      console.log(this.sportsPlayers);
    }
  }

  ngOnInit(): void {
    this.dataSource.data = [...this.sportsPlayers];
  }
}
