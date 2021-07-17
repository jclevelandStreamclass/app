import { Component, Input, OnInit } from '@angular/core';
import { SportsPlayer } from 'src/app/sportsplayers/models/sportsPlayer';
import { Serie } from '../../models/serie';



@Component({
  selector: 'app-series-intro',
  templateUrl: './series-intro.component.html',
  styleUrls: ['./series-intro.component.scss']
})
export class SeriesIntroComponent implements OnInit {

  @Input() sportsPlayer: SportsPlayer[] | null = [];
  @Input() series: Serie[] | null = [];

  constructor() {
   
  }
  
  ngOnChanges(): void {
    
  }

  ngOnInit(): void {
  }

}
