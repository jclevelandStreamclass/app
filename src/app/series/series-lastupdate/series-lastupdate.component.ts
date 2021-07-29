import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Serie } from '../models/serie';
import { SeriesService } from '../services/series.service';

@Component({
  selector: 'app-series-lastupdate',
  templateUrl: './series-lastupdate.component.html',
  styleUrls: ['./series-lastupdate.component.scss'],
})
export class SeriesLastupdateComponent implements OnInit {
  @Input() seriesUpdate: Serie[] = [];

  constructor(
    private router: Router,
    private authModelService: AuthService,
    private serviceModel: SeriesService
  ) {}

  ngOnInit(): void {}

  select(serieId: string): void {
    if (serieId) {
      this.router.navigate(['series', serieId]);
    }
  }

  isPremiumUser(): boolean {
    return this.authModelService.hasUserRole('premium');
  }
}
