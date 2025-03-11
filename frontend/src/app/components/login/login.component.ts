// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCreateComponent } from '../product-create/product-create.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  goToRegister() {
    this.router.navigate(['/register']); // Redirects to register page
  }
  
  onSubmit() {
    this.authService.login(this.loginData).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful:', response);
        this.authService.setToken(response.token);  // Store the token
        this.router.navigate(['/products']); // Redirect to product list page
      },
      (error) => {
        // Handle login error
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password.';
      }
    );
  }
}