import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {
  orderId: string = '';
  totalAmount: number = 0;
  paymentMethod: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get query parameters from the URL
    this.route.queryParamMap.subscribe((params) => {
      this.orderId = params.get('orderId') || '';
      this.totalAmount = Number(params.get('totalAmount')) || 0;
      this.paymentMethod = params.get('paymentMethod') || '';
    });
  }
  goToHome() {
    this.router.navigate(['/home']); // Redirect to home or another desired page
  }
}
