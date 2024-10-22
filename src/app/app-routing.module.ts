import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Đảm bảo đường dẫn đúng
import { IntroduceComponent } from './components/introduce/introduce.component';
import { ProductComponent } from './components/product/product.component';
import { ContactComponent } from './components/contact/contact.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'gioithieu', component: IntroduceComponent },
  { path: 'sanpham', component: ProductComponent },
  { path: 'lienhe', component: ContactComponent },
 

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // Đảm bảo trang không tìm thấy sẽ điều hướng về home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
