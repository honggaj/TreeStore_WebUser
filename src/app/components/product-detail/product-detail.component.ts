import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../api/services';
import { GetListProductSpResult, ProductResponseResultCustomModel } from '../../api/models';
import { CommonModule } from '@angular/common';
import { ApiConfiguration } from '../../api/api-configuration';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0; 
  product!: GetListProductSpResult; 
  rootUrl: string; 
  quantity: number = 1; // Khai báo số lượng

  // Danh sách sản phẩm trong giỏ hàng (có thể lưu trữ trong localStorage)
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
            this.product = response.data; 
            console.log('Thông tin sản phẩm:', this.product); // Kiểm tra dữ liệu sản phẩm
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
      name: this.product.productName,
      price: this.product.priceOutput,
      quantity: this.quantity,
      imageUrl: this.rootUrl + '/' + this.product.img
    };

    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Cập nhật số lượng nếu đã có
    } else {
      this.cartItems.push(item); // Thêm mới nếu chưa có
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    alert('Sản phẩm đã được thêm vào giỏ hàng!'); // Hiển thị thông báo
  }
}
