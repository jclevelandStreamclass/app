import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { LoginModelService } from './services/login-model.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = false;
  constructor(
    fb: FormBuilder,
    private loginModel: LoginModelService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  saveClick(form: FormGroup): void {
    if (form.valid) {
      this.loginModel.login(form.value).subscribe((user) => {
        if (user) {
          this.authService.storeUser(user);
          this.router.navigate(['/landing']);
        }
      });
      return;
    }
    this.error = true;
  }
}
