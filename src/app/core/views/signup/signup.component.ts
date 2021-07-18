import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SignupModelService } from './services/signup-model.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  error = false;
  userEmail: string = '';
  constructor(
    fb: FormBuilder,
    private signUpModel: SignupModelService,
    route: ActivatedRoute
  ) {
    route.params.subscribe((params) => {
      this.userEmail = params.userEmail || '';
    });

    this.signUpForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      avatar: [''],
    });
  }

  ngOnInit(): void {
    if (this.userEmail) {
      this.signUpForm.controls.email.setValue(this.userEmail);
    }
  }

  saveClick(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
      return;
    }

    this.error = true;
  }
}
