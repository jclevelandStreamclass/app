import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-episodes-stream',
  templateUrl: './episodes-stream.component.html',
  styleUrls: ['./episodes-stream.component.scss'],
})
export class EpisodesStreamComponent implements OnInit {
  video: string = '';
  urlVideo: SafeResourceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authModelService: AuthService
  ) {
    route.params.subscribe((params) => {
      this.video = params.video || '';
    });
  }

  ngOnInit(): void {
    //console.log(this.authModelService.user?.role);
    if (this.video) {
      this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.video);
    }
  }
}
