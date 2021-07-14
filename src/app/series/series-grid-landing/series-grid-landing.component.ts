import { Input, Component, OnInit } from '@angular/core';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-series-grid-landing',
  templateUrl: './series-grid-landing.component.html',
  styleUrls: ['./series-grid-landing.component.scss']
})
export class SeriesGridLandingComponent implements OnInit {

  @Input() series: Serie[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
