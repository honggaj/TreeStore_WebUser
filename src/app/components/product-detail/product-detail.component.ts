import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, ReviewService } from '../../api/services';
import { BooleanResultCustomModel, GetListProductSpResult, ProductResponseResultCustomModel, Review, ReviewResponse } from '../../api/models';
import { CommonModule } from '@angular/common';
import { ApiConfiguration } from '../../api/api-configuration';
import { StrictHttpResponse } from '../../api/strict-http-response';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0; 
  product!: GetListProductSpResult; 
  rootUrl: string; 
  quantity: number = 1;
  listReviewDB: Review[] = [];
  cartItems: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private productService: ProductService, 
    private reviewService: ReviewService,
    private config: ApiConfiguration
  ) {
    this.rootUrl = config.rootUrl;
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')); 
    this.loadProductDetail();
    this.loadReviews(); // Gọi hàm loadReviews để tải đánh giá
  }

  loadProductDetail(): void {
    const params = { productId: this.productId };

    this.productService.apiProductGetProductByIdGet$Json(params).subscribe((response: ProductResponseResultCustomModel) => { 
        if (response.success && response.data) { 
            this.product = response.data; 
            console.log('Thông tin sản phẩm:', this.product);
        } else {
            console.error('Không thể lấy thông tin sản phẩm hoặc không có dữ liệu');
        }
    }, error => {
        console.error('Lỗi khi gọi API:', error); 
    });
  }

  addToCart() {
    const item = {
      id: this.productId,
      name: this.product.productName,
      price: this.product.priceOutput,
      quantity: this.quantity,
      imageUrl: this.rootUrl + '/' + this.product.img
    };

    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  }

  loadReviews(): void {
    const params = { productId: this.productId };

    // Gọi API để lấy danh sách đánh giá theo productId
    this.reviewService.apiReviewGetReviewsByProductIdProductIdGet$Json$Response(params).subscribe(
        (rs) => {
            const response = rs.body;

            if (response && response.success) { // Kiểm tra `success`
                this.listReviewDB = response.data ?? []; // Nếu response.data là null, gán mảng rỗng
                console.log('Danh sách review:', this.listReviewDB); // In ra danh sách review
            } else {
                console.log('Lấy danh sách review thất bại!');
            }
        },
        error => {
            console.error('Lỗi khi lấy danh sách review:', error);
        }
    );
}
deleteReview(reviewId: number | undefined): void {
  // Kiểm tra reviewId có hợp lệ không
  if (!reviewId || reviewId <= 0) { // Kiểm tra reviewId hợp lệ
    console.error('reviewId không hợp lệ:', reviewId);
    Swal.fire('Lỗi!', 'ID đánh giá không hợp lệ.', 'error');
    return; // Thoát khỏi phương thức nếu reviewId không hợp lệ
  }

  Swal.fire({
    title: 'Bạn có chắc chắn muốn xóa review này?',
    text: "Hành động này không thể hoàn tác!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      this.reviewService.apiReviewDeleteReviewGetIdDelete$Json$Response({ 
        reviewId, 
        GetId: reviewId.toString() // Thêm thuộc tính GetId vào đây
      })
      .subscribe({
        next: (response: StrictHttpResponse<BooleanResultCustomModel>) => {
          const responseBody = response.body;

          console.log(responseBody); // In ra toàn bộ phản hồi

          // Kiểm tra thuộc tính 'success' trong responseBody
          if (responseBody && responseBody.success) {
            Swal.fire('Đã xóa!', 'Review đã được xóa thành công.', 'success');
            this.loadReviews(); // Tải lại danh sách review
          } else {
            Swal.fire('Lỗi!', responseBody.message || 'Xóa review không thành công.', 'error');
          }
        },
        error: (error) => {
          console.error('Lỗi khi xóa review:', error); // In lỗi nếu có
          Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa review.', 'error');
        }
      });
    }
  });
}






  navigateToReview() {
    this.router.navigate(['/danhgia', this.productId]); // Điều hướng đến trang đánh giá với productId
  }
}
