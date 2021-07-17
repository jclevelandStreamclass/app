import {
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user';
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
  avatar!: string;
  @ViewChild('avatarElement') avatarElement!: ElementRef<HTMLParagraphElement>;
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

  // ngAfterViewInit(): void {
  //   this.signUpForm
  //     .get('avatar')
  //     ?.valueChanges.subscribe((data) => (this.avatar = data.slice(12)));
  // }
  ngOnInit(): void {
    if (this.userEmail) {
      this.signUpForm.controls.email.setValue(this.userEmail);
    }
    this.avatar = this.signUpForm.controls.avatar.value;
    console.log(this.avatar);
  }

  onFilePic(e: Event): void {
    this.avatar = (e.target as HTMLInputElement).files![0].name;
  }

  saveClick(form: FormGroup) {
    if (form.valid) {
      const user: UserModel = form.value;
      user.avatar = user.avatar.slice(12);
      this.signUpModel.insertUser(user).subscribe(() => {
        console.log(user);
        this.signUpForm.reset();
        this.avatar = '';
      });
      return;
    }

    this.error = true;
  }
}
