import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports:[FormsModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]'); // Lấy sản phẩm từ localStorage

  constructor(private router: Router) {}

  get total() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Cập nhật lại localStorage
  }

  updateQuantity(itemId: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Cập nhật lại localStorage
    }
  }

  clearCart() {
    this.cartItems = []; // Xóa giỏ hàng
    localStorage.removeItem('cartItems'); // Xóa giỏ hàng trong localStorage
  }

  buyNow() {
    this.router.navigate(['/dathang'], { state: { cartItems: this.cartItems } });
  }
}
