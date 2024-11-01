import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductService } from '../../api/services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProductComponent, // Import trực tiếp vì ProductComponent là standalone
   
    
  ],
  providers: [
    ProductService // Khai báo ProductService để sử dụng trong ProductComponent
  ],
  exports: [
    ProductComponent // Xuất ProductComponent để có thể sử dụng ở nơi khác
  ]
})
export class ProductModule {}
