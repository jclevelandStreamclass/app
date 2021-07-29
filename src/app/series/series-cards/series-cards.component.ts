import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-series-cards',
  templateUrl: './series-cards.component.html',
  styleUrls: ['./series-cards.component.scss'],
})
export class SeriesCardsComponent implements OnInit {
  @Input() series: Serie[] = [];

  constructor(private router: Router, private authModelService: AuthService) {}

  ngOnInit(): void {}

  getLatestSeries(): void {
    this.router.navigate(['series/latest/update']);
  }

  select(serieId: string): void {
    if (serieId) {
      this.router.navigate(['series', serieId]);
    }
  }

  isPremiumUser(): boolean {
    return this.authModelService.hasUserRole('premium');
  }
}
