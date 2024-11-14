import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../api/services';
import { CreateOrderRequest } from '../../api/models';
import { BooleanResultCustomModel } from '../../api/models';
import { FormsModule } from '@angular/forms';
import { StrictHttpResponse } from '../../api/strict-http-response';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { PromotionService } from '../../api/services/promotion.service'; // Import service tìm kiếm mã giảm giá
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cartItems: any[] = [];
  shippingInfo = { name: '', phone: '', address: '' };
  orderNote: string = ''; // Biến để lưu ghi chú đơn hàng
  promotionCode: string = ''; // Biến lưu trữ mã giảm giá
  isPromotionValid: boolean = true; // Biến để kiểm tra tính hợp lệ của mã giảm giá
  discountAmount: number = 0; // Giá trị giảm giá (mặc định là 0)

  constructor(
    private router: Router,
    private orderService: OrderService,
    private promotionService: PromotionService // Inject service tìm mã giảm giá
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { cartItems: any[] };
    if (state?.cartItems) {
      this.cartItems = state.cartItems;
    } else {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    }

    // Lấy thông tin địa chỉ từ localStorage
    this.shippingInfo.name = localStorage.getItem('fullname') || '';
    this.shippingInfo.phone = localStorage.getItem('phone') || '';
    this.shippingInfo.address = localStorage.getItem('address') || '';
  }

  checkPromotionCode() {
    if (!this.promotionCode) {
      this.isPromotionValid = true;
      this.discountAmount = 0; // Không có mã giảm giá, không giảm giá
      console.log('Không có mã giảm giá nhập vào.');
      return;
    }
  
    const params = { promotionCode: this.promotionCode }; // Gửi mã giảm giá trong params
  
    console.log('Đang kiểm tra mã giảm giá:', this.promotionCode);
  
    this.promotionService.apiPromotionCheckPromotionCodeGet(params).subscribe(
      (response : any) => {
        this.isPromotionValid = true;
        this.discountAmount = response.discountAmount || 0; // Cập nhật discountAmount từ phản hồi
        console.log('Mã giảm giá hợp lệ:', response);
        Swal.fire({
          title: 'Mã giảm giá hợp lệ',
          text: 'Mã giảm giá của bạn đã được xác nhận.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        this.isPromotionValid = false;
        this.discountAmount = 0; // Nếu không hợp lệ, không có giảm giá
        console.log('Lỗi kiểm tra mã giảm giá:', error);
        Swal.fire({
          title: 'Mã giảm giá không hợp lệ',
          text: 'Mã giảm giá bạn nhập không hợp lệ.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  get total() {
    // Tính tổng giá trị đơn hàng
    const totalAmount = this.cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
  
    // Trừ đi discountAmount nếu có
    return totalAmount - this.discountAmount;
  }
  

  submitOrder() {
    const customerId = parseInt(localStorage.getItem('customerId') || '0');
    if (!customerId || isNaN(customerId)) {
      console.error('Customer ID không hợp lệ');
      return; // Dừng nếu Customer ID không hợp lệ
    }
    
    const promotionCode = this.promotionCode || ''; // Sử dụng chuỗi rỗng nếu không có mã giảm giá
    
    const orderRequest: CreateOrderRequest = {
      cartItems: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      customerId,
      note: this.orderNote,
      promotionCode
    };
    
    Swal.fire({
      title: 'Xác nhận đặt hàng',
      text: 'Bạn có chắc chắn muốn đặt hàng?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Đặt hàng',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Đơn hàng gửi đi:', orderRequest);
    
        this.orderService.apiOrderCreatePost$Json$Response({ body: orderRequest }).subscribe(
          (response: StrictHttpResponse<BooleanResultCustomModel>) => {
            const responseBody = response.body;
            if (responseBody.success) {
              Swal.fire({
                title: 'Đặt hàng thành công!',
                text: 'Đơn hàng của bạn đã được xác nhận.',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                localStorage.removeItem('cartItems'); // Xóa giỏ hàng
                this.router.navigate(['/success']); // Chuyển đến trang thành công
              });
            } else {
              Swal.fire({
                title: 'Đặt hàng không thành công',
                text: responseBody.message || '',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          },
          error => {
            Swal.fire({
              title: 'Lỗi',
              text: error?.message || 'Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            console.error('Lỗi khi đặt hàng:', error);
          }
        );
      }
    });
  }
  
  formatCurrency(value: number): string {
    if (isNaN(value)) {
      console.error('Giá trị không hợp lệ');
      return '0đ';
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
  }
}
