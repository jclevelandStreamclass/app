import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastMessagesService } from '../../../core/services/toast-messages.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserPaymentModelService } from './service/user-payment.service';
import {
  HttpClient
} from '@angular/common/http';

@Component({
  selector: 'app-userpayment',
  templateUrl: './userpayment.component.html',
  styleUrls: ['./userpayment.component.scss']
})
export class UserpaymentComponent implements OnInit {
  paymentHandler: any = null;
  constructor(
    private userPaymentModelService: UserPaymentModelService,
    private authService: AuthService,
    private router: Router,
    //private http: HttpClient,
    private toastMessage: ToastMessagesService
  ) { }

  ngOnInit() {
    if (this.authService.hasUserRole('premium')) {
      this.router.navigate(['home']);
      //this.toastMessage.showInfo('Únete a nuestro servicio Premium');
    }
    this.invokeStripe();
  }

  async updateUser(stripeToken: any, comp: UserpaymentComponent) {
    let data = {"result": JSON.stringify(stripeToken),"role":"premium"};
    comp.userPaymentModelService.changePlan(data).subscribe((user) => {
      comp.authService.setTokenChangePlanToken(user);
      comp.toastMessage.showSuccess('Servicio Premium Activado');
      this.router.navigate(['home']);
    });
  }

  async makePayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JRpf6BVKwO95VhVon4fxsCLCVv7kE58DLeUL1nB1WabkZQWGjDt4xyjb1nIuLr3joSGFf7FrTmWGYVzSBRRcReI00Kgoz8f7l',
      locale: 'auto',
      token: (stripeToken: any) => { this.updateUser(stripeToken, this) }
    });

    let peyment = await paymentHandler.open({
      name: 'Acuenta Premium StreamClass',
      description: 'Premium',
      amount: 15 * 100
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JRpf6BVKwO95VhVon4fxsCLCVv7kE58DLeUL1nB1WabkZQWGjDt4xyjb1nIuLr3joSGFf7FrTmWGYVzSBRRcReI00Kgoz8f7l',
          locale: 'auto',
          token: function (stripeToken: any) {
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

}
