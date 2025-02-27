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
import { PaymentComponent } from './components/payment/payment/payment.component';
import { PaymentCallbackComponent } from './components/payment/payment-callback/payment-callback.component';
import { PaymentSuccessComponent } from './components/payment/payment-success/payment-success.component';

import { NgxLoadingModule } from 'ngx-loading'; // Import NgxLoadingModule
import { PaymentFailedComponent } from './components/payment/payment-failed/payment-failed.component';
import { AccountComponent } from './components/account-user/account-user.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Đường dẫn cho trang đăng nhập và đăng ký
  { path: 'dangnhap', loadComponent: () => import('./components/login-user/login-user.component').then(m => m.LoginUserComponent) },
  { path: 'dangky', loadComponent: () => import('./components/register-user/register-user.component').then(m => m.RegisterUserComponent) },

  // Các trang chính
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'gioithieu', loadComponent: () => import('./components/introduce/introduce.component').then(m => m.IntroduceComponent) },
  { path: 'sanpham', loadComponent: () => import('./components/product/product.component').then(m => m.ProductComponent) },
  { path: 'lienhe', loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'giohang', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
  { path: 'dathang', loadComponent: () => import('./components/order/order.component').then(m => m.OrderComponent) },

  // Lịch sử đơn hàng và chi tiết đơn hàng
  { path: 'lichsudonhang', loadComponent: () => import('./components/order-history/order-history.component').then(m => m.OrderHistoryComponent) },
  { path: 'order-detail/:orderId', loadComponent: () => import('./components/order-detail/order-detail.component').then(m => m.OrderDetailComponent) }, // Trang chi tiết đơn hàng

  // Quên mật khẩu và xác minh OTP
  { path: 'quenmatkhau', loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
  { path: 'checkEmail', loadComponent: () => import('./components/checkEmail/checkEmail.components').then(m => m.OtpVerificationComponent) },

  // Tài khoản người dùng
  { path: 'taikhoan', loadComponent: () => import('./components/account-user/account-user.component').then(m => m.AccountComponent) },

  // Trang đánh giá sản phẩm
  { path: 'danhgia/:id', loadComponent: () => import('./components/review/review-user.component').then(m => m.ReviewComponent) },

  // Chi tiết sản phẩm sử dụng lazy loading
  { 
    path: 'xemchitiet/:id',
    loadComponent: () => import('./components/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-failed', component: PaymentFailedComponent },
  { path: 'payment-callback', component: PaymentCallbackComponent },
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
