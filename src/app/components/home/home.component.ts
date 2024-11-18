import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSliderComponent } from '../banner-slider/banner-slider.component';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { ApiConfiguration } from '../../api/api-configuration';
import { GetListProductSpResult, Product } from '../../api/models';
import { ProductService } from '../../api/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  cartItems: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
  quantity: number = 1; // Khai báo số lượng


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

  viewDetail(product: GetListProductSpResult): void {
    // Chuyển hướng đến trang chi tiết sản phẩm và truyền thông tin sản phẩm
    this.router.navigate(['/xemchitiet', product.productId]); // Thay đổi product.id thành ID của sản phẩm
  }

  addToCart(product: GetListProductSpResult) {
    const item = {
      productId: product.productId,
      name: product.productName,
      price: product.priceOutput,
      quantity: this.quantity, // Số lượng hiện tại muốn thêm
      imageUrl: this.rootUrl + '/' + product.img
    };
  
    // Tìm xem sản phẩm này đã tồn tại trong giỏ hàng chưa
    const existingItem = this.cartItems.find(cartItem => cartItem.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += this.quantity; // Cộng dồn số lượng
    } else {
      this.cartItems.push(item); // Thêm mới sản phẩm vào giỏ hàng nếu chưa có
    }
  
    // Cập nhật giỏ hàng vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  
  
  
    // Sử dụng SweetAlert2 để hiển thị thông báo
    Swal.fire({
      title: 'Thành công!',
      text: 'Sản phẩm đã được thêm vào giỏ hàng!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  
}
