import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  constructor(private router:Router){}
  goToLogin():void{
    this.router.navigate(['/dangnhap'])
  }
}
