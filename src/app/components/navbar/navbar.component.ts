import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule] // Thêm CommonModule vào imports
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const customerId = localStorage.getItem('customerId');
    this.isLoggedIn = customerId !== null;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Sử dụng hàm navigateTo để điều hướng đến trang tài khoản
  navigateToAccount(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/taikhoan']);
    } else {
      this.router.navigate(['/dangnhap']); // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
    }
  }
}
