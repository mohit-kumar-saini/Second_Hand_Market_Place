import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, FormsModule]

})
export class ProfileComponent implements OnInit {
  user: any = {};
  email: any = {};
  newPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.authService.getCurrentUser().subscribe(
      (data) => {
        this.user = data;
    
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        this.errorMessage = 'Could not load user profile.';
      }
    );
  }

  changePassword() {
    this.authService.changePassword(this.newPassword).subscribe(
      (response) => {
        this.successMessage = 'Password changed successfully!';
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error changing password:', error);
        this.errorMessage = 'Failed to change password.';
      }
    );
  }
}
