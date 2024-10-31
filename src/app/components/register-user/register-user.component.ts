import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Thay đổi ở đây
import { CustomerService } from '../../api/services';
import { CustomerRequest } from '../../api/models';

@Component({
  standalone: true, // Khai báo Standalone Component
  imports: [ReactiveFormsModule], // Thay đổi ở đây
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    // Khởi tạo FormGroup
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['']
    });
  }

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.valid) {
      const customerRequest: CustomerRequest = this.registerForm.value;

      this.customerService.apiCustomerRegisterPost$Json({
        body: customerRequest
      }).subscribe({
        next: (response) => {
          if (response?.success) {
            alert('Đăng ký thành công!');
            setTimeout(() => {
              this.router.navigate(['/dangnhap']);
            }, 1000); // Chờ 1 giây
          } else {
            alert('Đăng ký không thành công: ' + (response?.message || 'Có lỗi xảy ra!'));
          }
        },
        error: (err) => {
          console.error('Lỗi khi gọi API:', err);
          alert('Có lỗi xảy ra, vui lòng thử lại!');
        }
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  }
}
