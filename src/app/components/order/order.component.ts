import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  cartItems: any[] = [
    {
      name: 'Cây ngọc vân',
      price: 30000,
      quantity: 2,
      imageUrl: 'images/ngocvan.png' // Đường dẫn đến hình ảnh giả
    },
    {
      name: 'Cây trúc bách hợp',
      price: 50000,
      quantity: 1,
      imageUrl: 'images/trucbachhop.png' // Đường dẫn đến hình ảnh giả
    },
    {
      name: 'Cây lưỡi hổ',
      price: 120000,
      quantity: 3,
      imageUrl: 'images/cayluoiho.png' // Đường dẫn đến hình ảnh giả
    }
  ];
  shippingInfo = { name: '', phone: '', address: '' };

  constructor(private router: Router) {
    // Không cần kiểm tra navigation nếu bạn đang sử dụng dữ liệu giả
  }

  get total() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  submitOrder() {
    console.log('Đơn hàng đã được xác nhận:', {
      items: this.cartItems,
      shippingInfo: this.shippingInfo
    });
  }
}
