import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSliderComponent } from '../banner-slider/banner-slider.component';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { ApiConfiguration } from '../../api/api-configuration';
import { GetListProductSpResult, Product } from '../../api/models';
import { ProductService } from '../../api/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerSliderComponent, ImageSliderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listProducts: GetListProductSpResult[] = [];
  currentIndex: number = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    protected config: ApiConfiguration,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get rootUrl(): string {
    return this.config.rootUrl;
  }

  loadProducts(): void {
    this.productService.apiProductListProductGet$Json$Response().subscribe((rs) => {
      const response = rs.body;
      if (response.success && Array.isArray(response.data)) {
        this.listProducts = response.data;
        this.currentIndex = 0; // Reset to first slide
      } else {
        console.log('Lấy dữ liệu danh sách sản phẩm thất bại');
      }
    });
  }
  
  // Slide management methods
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.listProducts.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.listProducts.length) % this.listProducts.length;
  }

  getDisplayedProducts(): Product[] {
    if (this.listProducts.length === 0) {
      return [];
    }
    return [
      this.listProducts[this.currentIndex],
      this.listProducts[(this.currentIndex + 1) % this.listProducts.length],
      this.listProducts[(this.currentIndex + 2) % this.listProducts.length],
      this.listProducts[(this.currentIndex + 3) % this.listProducts.length],
    ];
  }
}
