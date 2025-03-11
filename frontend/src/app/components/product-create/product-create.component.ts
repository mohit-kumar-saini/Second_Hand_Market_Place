import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-product-create',
  standalone: true, 
  imports: [FormsModule, CommonModule], 
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  private productService = inject(ProductService); 
  private router = inject(Router); 
  private authService = inject(AuthService);
 
  productData = { 
    title: '',
    description: '',
    price: 0,
    category: '',
    condition: '',
    imageUrl: '',
    seller: { _id: '', username: '' }
  };

  errorMessage: string = '';

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.productData.seller.username = user.username; 
    });
  }

  onSubmit(): void {

    console.log('Submitting product data:', this.productData);
    
    if (!this.productData.title || !this.productData.description || this.productData.price <= 0 || !this.productData.category || !this.productData.condition || !this.productData.imageUrl) { 
        this.errorMessage = 'Please fill in all required fields with valid data.';
        return;
    }

    this.authService.getCurrentUser().subscribe(user => {
      this.productData.seller.username = user.username; 
      this.productService.createProduct({ ...this.productData as any }).subscribe({
        next: (response: any) => { 
          console.log('Product created:', response);
          this.router.navigate(['/products']);
        },
        error: (error: any) => { 
          console.error('Error creating product:', error.error.msg || error.message);
          this.errorMessage = 'Failed to create product. Please try again.';
        }
      });
    });
  }
}
