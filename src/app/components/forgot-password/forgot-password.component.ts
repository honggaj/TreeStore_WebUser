import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Add CommonModule to imports
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  ngOnInit(): void {}

  goToLogin(): void {
    this.router.navigate(['/dangnhap']);
  }

  submitForgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    const email = this.forgotPasswordForm.get('email')?.value;
    // Xử lý gửi email quên mật khẩu, ví dụ gọi một service API.
    console.log('Gửi yêu cầu khôi phục mật khẩu tới: ', email);

    // Sau khi gửi thành công, bạn có thể chuyển hướng người dùng
    this.router.navigate(['/check-email']);
  }
}
