import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../api/services';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-account',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.css']
})
export class AccountComponent implements OnInit {
  customerId!: number; 
  customerDB: any; 
  editAccountForm: FormGroup;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) 
  
    {this.editAccountForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
   
    });
  }

  ngOnInit() {
    const customerIdFromStorage = localStorage.getItem('customerId');

    if (customerIdFromStorage) {
      this.customerId = +customerIdFromStorage;

      this.customerService.apiCustomerGetCustomerByIdGet$Json$Response({ customerId: this.customerId }).subscribe((rs) => {
        if (rs.body && rs.body.success) {
          this.customerDB = rs.body.data;
          this.editAccountForm.patchValue({
            fullname: this.customerDB.fullname,
            email: this.customerDB.email,
            phone: this.customerDB.phone,
            address: this.customerDB.address,
           
          });
          localStorage.setItem('fullname', this.customerDB.fullname);
          localStorage.setItem('email', this.customerDB.email);
        } else {
          console.log('Lấy dữ liệu người dùng thất bại:', rs.body.message);
          this.router.navigate(['/error-page']);
        }
      });
    } else {
      console.error("Không tìm thấy ID người dùng trong storage.");
      this.router.navigate(['/error-page']);
    }
  }

  // Thêm phương thức để xử lý việc tải lên file avatar
 

  cancel() {
    this.router.navigate(['/taikhoan']); 
  }

  onSubmit() {
    if (this.editAccountForm.valid) {
      const updatedAccount = {
        customerId: this.customerId,
        fullname: this.editAccountForm.get('fullname')?.value,
        phone: this.editAccountForm.get('phone')?.value,
        email: this.editAccountForm.get('email')?.value,
        address: this.editAccountForm.get('address')?.value,
      };
  
      // Kiểm tra nếu không có thay đổi
      const isChanged =
        updatedAccount.fullname !== this.customerDB.fullname ||
        updatedAccount.phone !== this.customerDB.phone ||
        updatedAccount.email !== this.customerDB.email ||
        updatedAccount.address !== this.customerDB.address;
  
      if (!isChanged) {
        Swal.fire({
          icon: 'info',
          title: 'Không có gì thay đổi',
          text: 'Bạn chưa thay đổi thông tin nào!',
          confirmButtonText: 'OK'
        });
        return;
      }
  
      // Gửi yêu cầu cập nhật nếu có thay đổi
      this.customerService.apiCustomerUpdateCustomerPut$Json$Response({ body: updatedAccount }).subscribe({
        next: (rs) => {
          if (rs.body.success) {
            // Cập nhật localStorage nếu cập nhật thành công
            localStorage.setItem('fullname', updatedAccount.fullname);
            localStorage.setItem('email', updatedAccount.email);
            localStorage.setItem('phone', updatedAccount.phone || '');
            localStorage.setItem('address', updatedAccount.address || '');
  
            Swal.fire({
              icon: 'success',
              title: 'Cập nhật thành công',
              text: 'Thông tin tài khoản đã được cập nhật thành công!',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/account']);
            });
          } else {
            console.log('Cập nhật thất bại:', rs.body.message);
            Swal.fire({
              icon: 'error',
              title: 'Cập nhật thất bại',
              text: rs.body.message || 'Có lỗi xảy ra, vui lòng thử lại!',
            });
          }
        },
        error: (error) => {
          console.error('Có lỗi xảy ra:', error);
          Swal.fire({
            icon: 'error',
            title: 'Có lỗi xảy ra',
            text: 'Không thể cập nhật thông tin. Vui lòng kiểm tra lại!',
          });
        }
      });
    } else {
      console.log('Form không hợp lệ');
      Swal.fire({
        icon: 'warning',
        title: 'Thông tin không hợp lệ',
        text: 'Vui lòng kiểm tra các trường và thử lại!',
      });
    }
  }
  
} 