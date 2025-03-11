import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common'; 

interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    seller: { _id: string; username: string };
}

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
    standalone: true,
    imports: [CommonModule],
})
export class ProductDetailComponent implements OnInit {
    product: Product | undefined;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService
    ) { }

    

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id') || '';
      
        console.log('Product ID:', id);
        if (id) {
            this.productService.getProductById(id).subscribe({
                next: (product) => {
                    this.product = product;
                },
                error: (error) => {
                    console.error('Error fetching product:', error);
                }
            });
        } else {
            console.error('Invalid product ID');
        }
      }
      
    
}
