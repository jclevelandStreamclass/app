import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/series/models/serie';
import { SeriesService } from 'src/app/series/services/series.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  series: Serie[] = [];
  constructor(private serviceModel: SeriesService) { }

  ngOnInit(): void {
    this.serviceModel.getSeries().subscribe(result => {
      this.series = result;
    })
  }


}
