import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgClass, CommonModule } from '@angular/common';  // Import cả NgIf và NgClass từ @angular/common
import { CustomerService } from '../../api/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [NgIf, NgClass,CommonModule]  // Thêm NgClass vào imports
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  isDropdownOpen = false;
  cartCount: number = 0;
  isDarkMode = false;
  cartItems: any[] = [];  // Giỏ hàng của người dùng
 

  constructor(private router: Router, private customerService: CustomerService) {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const customerId = localStorage.getItem('customerId');
    this.isLoggedIn = customerId !== null;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  navigateToAccount(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/taikhoan']);
    } else {
      this.router.navigate(['/dangnhap']); // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
    }
  }
  navigateToOrder(route: string){
    
      this.router.navigate(['/lichsudonhang']);
    
  }

  onAccountIconClick() {
    if (this.isLoggedIn) {
      this.toggleDropdown();
      
      // window.location.reload();
      // Nếu đã đăng nhập, hiển thị dropdown
    } else {
      this.router.navigate(['/dangnhap']);  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onContainerClick(event: Event) {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.customerService.apiCustomerLogoutPost({ }).subscribe({
      next: () => {
        // Xóa thông tin người dùng khỏi `localStorage`
        localStorage.removeItem('customerId');
        localStorage.removeItem('fullname');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('address');

        // Hiển thị thông báo đăng xuất thành công
        Swal.fire('Đăng xuất thành công', 'Bạn đã đăng xuất thành công!', 'success');
        
        // Điều hướng người dùng đến trang đăng nhập hoặc trang chủ
        this.router.navigate(['/dangnhap']);
      },
      error: () => {
        Swal.fire('Đăng xuất thất bại', 'Có lỗi xảy ra khi đăng xuất.', 'error');
      }
    });
  }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  updateCartCount(): void {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartCount = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
  }


  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.key === 'cartItems') {
      this.updateCartCount(); // Cập nhật lại khi `cartItems` thay đổi
    }
  }
  ngOnInit(): void {
    this.updateCartCount();
  }




}
