import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-payment-failed',
  standalone: true,
  imports: [],
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css'] // Sửa thành styleUrls
})
export class PaymentFailedComponent {
  constructor(private router: Router) {} // Định nghĩa router đúng trong constructor

  goToHome() {
    this.router.navigate(['/home']); // Chuyển hướng đến trang chủ hoặc trang khác
  }
}
