import { Serie } from 'src/app/series/models/serie';
import { SeriesService } from 'src/app/series/services/series.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  emailForm: FormGroup;
  series: Serie[] = [];

  @Output() sendEmail = new EventEmitter<string>();

  constructor(fb: FormBuilder, private serviceModel: SeriesService) {
    this.emailForm = fb.group({
      email: [''],
    });
  }

  
  ngOnInit(): void {
    this.serviceModel.getSeries().subscribe(result => {
      this.series = result;
    })
  }

  registerEmail(form: FormGroup): void {
    if (form.valid) {
      const userEmail = form.value.email;
      console.log(userEmail);
      this.sendEmail.emit(userEmail);
    }
  }
}
