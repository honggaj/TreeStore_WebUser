import { Component } from '@angular/core';
import { TreeTypeMenuComponent } from '../tree-type-menu/tree-type-menu.component'; // Đảm bảo đường dẫn đúng
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TreeTypeMenuComponent], 
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Sửa thành styleUrls
})

export class ProductComponent {
  constructor(private router: Router) {}

  viewDetail() {
    // Điều hướng tới trang chi tiết sản phẩm với Router
    this.router.navigate(['/xemchitiet']);
  }

  addToCart() {
    // Thêm sản phẩm vào giỏ hàng (bạn có thể gọi một service tại đây)
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  }
  // Logic cho ProductComponent
}
