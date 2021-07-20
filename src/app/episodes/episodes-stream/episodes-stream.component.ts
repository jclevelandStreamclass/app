import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-episodes-stream',
  templateUrl: './episodes-stream.component.html',
  styleUrls: ['./episodes-stream.component.scss'],
})
export class EpisodesStreamComponent implements OnInit {
  video: string = '';
  urlVideo: SafeResourceUrl = '';

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    route.params.subscribe((params) => {
      this.video = params.video || '';
    });
  }

  ngOnInit(): void {
    if (this.video) {
      this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.video);
    }
  }
}
