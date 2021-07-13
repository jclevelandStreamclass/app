import { Component, OnInit } from '@angular/core';
import { Serie } from './models/serie'
import { SeriesService } from './services/series.service';
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  series: Serie[] = [];

  constructor(private serviceModel: SeriesService) { }

  // Lanzamos las series de la DB al iniciar la ruta
  ngOnInit(): void {
    this.serviceModel.getSeries().subscribe(result => {
      this.series = result;
    })
  }

}
