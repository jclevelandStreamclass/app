import { Input, Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-series-grid-landing',
  templateUrl: './series-grid-landing.component.html',
  styleUrls: ['./series-grid-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesGridLandingComponent {
  _series!: Serie[];
  @Input() set series(value: Serie[]) {
    this._series = value.sort(this.random).slice(0, 4);
  }

  constructor(private router: Router) {}

  random = () => Math.floor(Math.random() - 0.5);

  select(serieId: string): void {
    if (serieId) {
      this.router.navigate(['series', serieId]);
    }
  }

  checkRoute(): boolean {
    return this.router.url === '/home';
  }
}
