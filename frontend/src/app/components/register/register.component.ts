import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule] 
})
export class RegisterComponent {
  registerData = {
    username: '',
    email: '',
    password: ''
  };
  errorMessage = ''; 
  constructor(private authService: AuthService, private router: Router) {}


  goToLogin() {
    this.router.navigate(['/login']); // Redirects to register page
  }

  onSubmit() {
    this.authService.register(this.registerData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.errorMessage = ''; 
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration error:', error);

        if (error.status === 400) {
          this.errorMessage = error.error.msg || "User already exists.";
        } else {
          this.errorMessage = "Registration failed. Please try again.";
        }
      }
    );
  }
}
