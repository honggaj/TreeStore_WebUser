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

export const routes: Routes = [
  {path:'dangnhap',component:LoginUserComponent},
  {path:'dangky',component:RegisterUserComponent},
  { path: 'home', component: HomeComponent },
  { path: 'gioithieu', component: IntroduceComponent },
  { path: 'sanpham', component: ProductComponent },
  { path: 'lienhe', component: ContactComponent },
  { path: 'giohang', component: CartComponent },
  { path: 'dathang', component: OrderComponent },
  { path: 'xemchitiet', component: ProductDetailComponent },
  { path: 'taikhoan', component: AccountComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }, // Đảm bảo trang không tìm thấy sẽ điều hướng về home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
