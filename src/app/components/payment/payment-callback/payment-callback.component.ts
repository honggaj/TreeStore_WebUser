import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { CommonModule } from '@angular/common';
import { PayPalService } from '../../../api/services';

@Component({
  selector: 'app-payment-callback',
  templateUrl: './payment-callback.component.html',
  styleUrls: ['./payment-callback.component.css'],
  standalone: true,
  imports: [NgxLoadingModule, CommonModule], // Import ngx-loading module only for this component
})
export class PaymentCallbackComponent implements OnInit {
  loading: boolean = true; // Flag to control loading state

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute into the constructor
    private http: HttpClient,
    private _paypalService: PayPalService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const payerId = this.route.snapshot.queryParamMap.get('PayerID');

    if (token && payerId) {
      // Set loading to true when API call starts
      this.loading = true;

      // Send the token and PayerID to the backend to confirm the payment

      this._paypalService
        .apiPayPalCaptureOrderOrderIdPost$Json$Response({ orderId: token })
        .subscribe((rs) => {
          const response = rs.body;
          if (response.success) {
            this.loading = false; // Set loading to false when the response is received
            // After successful payment
            window.location.href = `http://localhost:4300/payment-success?orderId=${response.data?.orderId}&totalAmount=${response.data?.totalAmount}&paymentMethod=PayPal`;
          }
          else
          {
            this.loading = false; // Set loading to false when the response is received
            window.location.href = 'http://localhost:4300/payment-failed';
          }
        });
    }  
  }
}
