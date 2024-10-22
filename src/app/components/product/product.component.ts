import { Component } from '@angular/core';
import { TreeTypeMenuComponent } from '../tree-type-menu/tree-type-menu.component'; // Đảm bảo đường dẫn đúng

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TreeTypeMenuComponent], // Đảm bảo có dấu phẩy
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Sửa thành styleUrls
})
export class ProductComponent {
  // Logic cho ProductComponent
}
