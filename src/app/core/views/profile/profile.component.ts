import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: UserModel | null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user;
  }
  signout(): void {
    this.authService.logOutUser();
  }
}
