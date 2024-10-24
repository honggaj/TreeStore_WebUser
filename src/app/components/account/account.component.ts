import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: any;

  constructor() { 
    // Thêm dữ liệu giả cho user
    this.user = {
      fullname: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      address: '123 Đường ABC, Quận 1, TP. HCM',
      birthday: '1990-01-01'
    };
  }

  ngOnInit(): void {
  }

  saveChanges(): void {
    // Xử lý khi người dùng lưu thay đổi
    console.log('Thông tin đã được lưu:', this.user);
    alert('Thông tin đã được cập nhật!');
  }
}
