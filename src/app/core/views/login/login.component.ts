import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  activate: string = '';
  constructor(
    route: ActivatedRoute,
    fb: FormBuilder,
    private loginModel: LoginModelService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastMessagesService
  ) {
    route.params.subscribe((params) => {
      this.activate = params.activate || '';
    });

    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated) {
      this.router.navigate(['/landing']);
    }

    if (this.activate) {
      console.log(this.activate);
      this.loginModel.activateUser(this.activate).subscribe(() => {
        this.toastService.showSuccess('Tu cuenta ha sido activada');
      });
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
        if (!user) {
          this.toastService.showError('El usuario');
        }
      });
      return;
    }
    this.error = true;
  }
}
