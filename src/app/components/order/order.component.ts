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

  get total() {
    return this.cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
  }

  submitOrder() {
    // Lấy Customer ID từ localStorage và chuyển đổi sang số nguyên
    const customerId = parseInt(localStorage.getItem('customerId') || '0');
  
    // Kiểm tra Customer ID hợp lệ
    if (!customerId || isNaN(customerId)) {
      console.error('Customer ID không hợp lệ');
      return; // Dừng nếu Customer ID không hợp lệ
    }
  
    // Kiểm tra và chuyển đổi promotionCode thành số nếu có, nếu không có mã giảm giá thì gán promotionId = 0
    const promotionId = this.promotionCode ? parseInt(this.promotionCode) : 0;
  
    // Kiểm tra nếu promotionCode không phải là một số hợp lệ
    if (this.promotionCode && isNaN(promotionId)) {
      console.error('Mã giảm giá không hợp lệ');
      return; // Dừng nếu mã giảm giá không hợp lệ
    }
  
    // Tạo đối tượng đơn hàng
    const orderRequest: CreateOrderRequest = {
      cartItems: this.cartItems.map(item => ({
        productId: item.productId, // ID sản phẩm
        quantity: item.quantity // Số lượng sản phẩm
      })),
      customerId, // ID khách hàng
      note: this.orderNote, // Ghi chú đơn hàng
      promotionId, // Mã khuyến mãi (sẽ là 0 nếu không có mã giảm giá hợp lệ)
    };
  
    // Xác nhận đặt hàng qua SweetAlert2
    Swal.fire({
      title: 'Xác nhận đặt hàng',
      text: 'Bạn có chắc chắn muốn đặt hàng?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Đặt hàng',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        // Gọi API để tạo đơn hàng khi người dùng xác nhận
        console.log('Đơn hàng gửi đi:', orderRequest); // In ra đơn hàng để kiểm tra
  
        // Gọi API để tạo đơn hàng
        this.orderService.apiOrderCreatePost$Json$Response({ body: orderRequest }).subscribe(
          (response: StrictHttpResponse<BooleanResultCustomModel>) => {
            // Xử lý phản hồi từ API
            const responseBody = response.body; // Lấy nội dung phản hồi
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
            // Xử lý lỗi khi gọi API
            Swal.fire({
              title: 'Lỗi',
              text: error?.message || 'Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            console.error('Lỗi khi đặt hàng:', error); // Log lỗi chi tiết
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
