import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastMessagesService } from '../../services/toast-messages.service';

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
    private router: Router,
    private toastService: ToastMessagesService
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated) {
      this.router.navigate(['/landing']);
    }
  }

  saveClick(form: FormGroup): void {
    if (form.valid) {
      this.loginModel.login(form.value).subscribe((user) => {
        if (user?.active) {
          this.authService.storeUser(user);
          this.router.navigate(['/landing']);
        }
        if (user?.active === false) {
          this.toastService.showError(
            'Tienes que activar tu cuenta, revisa tu correo electrónico'
          );
        }
      });
      return;
    }
    this.error = true;
  }
}
