import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule], // Đảm bảo FormsModule được thêm vào đây
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  cartItems: any[] = [];
  shippingInfo = { name: '', phone: '', address: '' };

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['cartItems']) {
      this.cartItems = navigation.extras.state['cartItems'];
      console.log('Cart items received:', this.cartItems);
    } else {
      console.error('No cart items found');
      this.cartItems = []; // Khởi tạo thành mảng rỗng để tránh lỗi
    }
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
