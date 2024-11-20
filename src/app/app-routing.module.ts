import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IntroduceComponent } from './components/introduce/introduce.component';
import { ProductComponent } from './components/product/product.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OtpVerificationComponent } from './components/checkEmail/checkEmail.components';
import { AccountComponent } from './components/account-user/account-user.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  // Đường dẫn cho trang đăng nhập và đăng ký
  { path: 'dangnhap', component: LoginUserComponent },
  { path: 'dangky', component: RegisterUserComponent },

  // Các trang chính
  { path: 'home', component: HomeComponent },
  { path: 'gioithieu', component: IntroduceComponent },
  { path: 'sanpham', component: ProductComponent },
  { path: 'lienhe', component: ContactComponent },
  { path: 'giohang', component: CartComponent },
  { path: 'dathang', component: OrderComponent },

  // Lịch sử đơn hàng và chi tiết đơn hàng
  { path: 'lichsudonhang', component: OrderHistoryComponent },
  { path: 'order-detail/:orderId', component: OrderDetailComponent }, // Trang chi tiết đơn hàng

  // Quên mật khẩu và xác minh OTP
  { path: 'quenmatkhau', component: ForgotPasswordComponent },
  { path: 'checkEmail', component: OtpVerificationComponent },

  // Tài khoản người dùng
  { path: 'taikhoan', component: AccountComponent },

  // Trang đánh giá sản phẩm
  { path: 'danhgia/:id', loadComponent: () => import('./components/review/review-user.component').then(c => c.ReviewComponent) },

  // Chi tiết sản phẩm sử dụng lazy loading
  { 
    path: 'xemchitiet/:id',
    loadComponent: () => import('./components/product-detail/product-detail.component').then(c => c.ProductDetailComponent)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
