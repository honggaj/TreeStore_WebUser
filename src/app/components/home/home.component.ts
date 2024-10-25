import { Component } from '@angular/core';
import { BannerSliderComponent } from '../banner-slider/banner-slider.component';
import {ImageSliderComponent} from '../image-slider/image-slider.component'
 // Kiểm tra đường dẫn chính xác

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerSliderComponent,ImageSliderComponent], // Thêm BannerSliderComponent vào đây
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
}
