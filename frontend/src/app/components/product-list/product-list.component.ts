import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service'; // Import CategoryService
import { CommonModule } from '@angular/common';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  imageUrl: string;
  seller: { _id: string; username: string } | null;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

ngOnInit(): void {

  this.loadProducts();

  this.categoryService.getCategories().subscribe((categories: string[]) => {
    if (categories.length > 0) {
     
    
    }
  });


  this.categoryService.getCategoryUpdates().subscribe((category: string) => {
    if (category) {
      this.loadProducts(category); 
    } else {
      this.loadProducts(); 
    }
  });

  }

  loadProducts(category: string = ''): void {
    this.productService.getProducts(category).subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value; 
    this.categoryService.changeCategory(selectedCategory); 
    this.loadProducts(selectedCategory); 
  }

}
