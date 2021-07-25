import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @ViewChild('spinner') spinner!: ElementRef;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}
}
