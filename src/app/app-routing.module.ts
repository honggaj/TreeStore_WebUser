import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Đảm bảo đường dẫn đúng
import { IntroduceComponent } from './components/introduce/introduce.component';
import { ProductComponent } from './components/product/product.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AccountComponent } from './components/account/account.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

import { AppComponent } from './app.component';
import { OtpVerificationComponent } from './components/checkEmail/checkEmail.components';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { PaymentCallbackComponent } from './components/payment/payment-callback/payment-callback.component';
import { PaymentSuccessComponent } from './components/payment/payment-success/payment-success.component';

import { NgxLoadingModule } from 'ngx-loading'; // Import NgxLoadingModule
import { PaymentFailedComponent } from './components/payment/payment-failed/payment-failed.component';

export const routes: Routes = [
  {path:'dangnhap',component:LoginUserComponent},
  {path:'dangky',component:RegisterUserComponent},
  { path: 'home', component: HomeComponent },
  { path: 'gioithieu', component: IntroduceComponent },
  { path: 'sanpham', component: ProductComponent },
  { path: 'lienhe', component: ContactComponent },
  {path:'giohang',component:CartComponent},
  {path:'dathang',component:OrderComponent},
  {path: 'lichsudonhang',component:OrderHistoryComponent},
  { path: 'order-detail/:orderId', component: OrderDetailComponent }, // Trang chi tiết đơn hàng
  {path:'quenmatkhau',component:ForgotPasswordComponent},
  {path:'checkEmail',component:OtpVerificationComponent },
  {
    path: 'xemchitiet/:id', // :id là tham số để truyền ID sản phẩm
    loadComponent: () => import('./components/product-detail/product-detail.component').then((c) => c.ProductDetailComponent)
  },
  {path:'taikhoan',component:AccountComponent},
  {path:'danhgia/:id',
    loadComponent: () => import('./components/review/review-user.component').then((c) => c.ReviewComponent )
   },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-failed', component: PaymentFailedComponent },
  { path: 'payment-callback', component: PaymentCallbackComponent },
  { path: '**', redirectTo: '/home' }, // Đảm bảo trang không tìm thấy sẽ điều hướng về home
];

@NgModule({
   
    
  imports: [RouterModule.forRoot(routes),
    FormsModule ,
    ReactiveFormsModule,  
  ],
  exports: [RouterModule ],
})
export class AppRoutingModule {}