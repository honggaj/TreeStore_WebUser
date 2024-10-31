import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../api/services';
import { GetListProductSpResult } from '../../api/models';
import { TreeTypeMenuComponent } from '../tree-type-menu/tree-type-menu.component';
import { CommonModule } from '@angular/common';
import { ApiConfiguration } from '../../api/api-configuration'; // Thêm ApiConfiguration

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, TreeTypeMenuComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: GetListProductSpResult[] = []; // Khai báo mảng sản phẩm

  constructor(
    private router: Router, 
    private productService: ProductService,
    private config: ApiConfiguration // Inject ApiConfiguration để lấy rootUrl
  ) {}

  ngOnInit(): void {
    this.listProducts(); 
  }

  // Lấy rootUrl từ config
  get rootUrl(): string {
    return this.config.rootUrl;
  }

  listProducts(): void {
    this.productService.apiProductListProductGet$Json$Response().subscribe(
      (rs) => {
        const response = rs.body; 
        if (response.success) {
          this.products = response.data ?? []; // Gán dữ liệu vào mảng sản phẩm
          console.log("Products:", this.products); // Kiểm tra xem `products` đã nhận đúng dữ liệu chưa
        } else {
          this.products = []; // Đặt lại mảng sản phẩm nếu không có dữ liệu
        }
      }
    );
  }

  viewDetail(): void {
    this.router.navigate(['/xemchitiet']);
  }

  addToCart(): void {
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  }
}
