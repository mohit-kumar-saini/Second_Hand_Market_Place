import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'secondhand-marketplace';
  categories: string[] = []; 
  selectedCategory: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value; 
    this.categoryService.changeCategory(this.selectedCategory); 
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
