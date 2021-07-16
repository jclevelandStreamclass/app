import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupModelService } from './services/signup-model.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  error = false;
  constructor(fb: FormBuilder, private signUpModel: SignupModelService) {
    this.signUpForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      avatar: [''],
    });
  }

  ngOnInit(): void {}

  saveClick(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
      return;
    }

    this.error = true;
  }
}
