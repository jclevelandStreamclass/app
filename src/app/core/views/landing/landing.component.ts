import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  emailForm: FormGroup;

  @Output() sendEmail = new EventEmitter<string>();

  constructor(fb: FormBuilder) {
    this.emailForm = fb.group({
      email: [''],
    });
  }
  

  ngOnInit(): void {}

  registerEmail(form: FormGroup): void {
    if (form.valid) {
      const userEmail = form.value.email;
      console.log(userEmail);
      this.sendEmail.emit(userEmail);
    }
  }
}
