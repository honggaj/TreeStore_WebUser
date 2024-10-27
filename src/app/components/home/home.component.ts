import { Component, OnInit } from '@angular/core';
import { BannerSliderComponent } from '../banner-slider/banner-slider.component';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { ProductService } from '../../api/services';
// Kiểm tra đường dẫn chính xác

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerSliderComponent, ImageSliderComponent], // Thêm BannerSliderComponent vào đây
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this._productService
      .apiProductListProductGet$Json$Response()
      .subscribe((rs) => {
        console.log(rs);
      });
  }
}
