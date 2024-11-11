import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../api/services';
import { ProductResponse, ProductResponseResultCustomModel } from '../../api/models';
import { CommonModule } from '@angular/common';
import { ApiConfiguration } from '../../api/api-configuration';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0; 
  product!: ProductResponse; // Đổi kiểu dữ liệu của product thành ProductResponse
  rootUrl: string; 
  quantity: number = 1; 

  cartItems: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private config: ApiConfiguration
  ) {
    this.rootUrl = config.rootUrl;
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')); 
    this.loadProductDetail();
  }

  loadProductDetail(): void {
    const params = { productId: this.productId };

    this.productService.apiProductGetProductByIdGet$Json(params).subscribe((response: ProductResponseResultCustomModel) => { 
        if (response.success && response.data) { 
            this.product = response.data; // Đảm bảo product được gán từ data với kiểu ProductResponse
            console.log('Thông tin sản phẩm:', this.product); 
        } else {
            console.error('Không thể lấy thông tin sản phẩm hoặc không có dữ liệu');
        }
    }, error => {
        console.error('Lỗi khi gọi API:', error); 
    });
  }

  addToCart() {
    const item = {
      id: this.productId,
      name: this.product.name,
      price: this.product.priceOutput,
      quantity: this.quantity,
      imageUrl: this.rootUrl + '/' + this.product.img
    };

    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    // Hiển thị thông báo bằng SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Sản phẩm đã được thêm vào giỏ hàng!',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
