import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems = [
    { id: 1, name: 'Cây trúc bách hợp', price: 100000, quantity: 1, imageUrl: 'images/trucbachhop.png' },
    { id: 2, name: 'Cây lưỡi hổ', price: 150000, quantity: 1, imageUrl: 'images/cayluoiho.png' },
    { id: 3, name: 'Cây ngọc vân', price: 200000, quantity: 1, imageUrl: 'images/ngocvan.png' },
  ];

  constructor(private router: Router) {} // Inject Router vào constructor

  get total() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  updateQuantity(itemId: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  }

  clearCart() {
    this.cartItems = [];
  }

  buyNow() {
    // Điều hướng đến OrderComponent với cartItems trong state
    this.router.navigate(['/dathang'], { state: { cartItems: this.cartItems } });

  }
}
