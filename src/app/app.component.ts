import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], // Đảm bảo rằng NavbarComponent được import
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Chú ý sử dụng 'styleUrls' thay vì 'styleUrl'
})
export class AppComponent {
  title = 'bancaycanh';
}
