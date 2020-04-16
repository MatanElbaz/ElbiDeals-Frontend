import { Component, OnInit } from '@angular/core';
import { ModeService } from 'src/app/services/mode.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-purchase-coupon',
  templateUrl: './purchase-coupon.component.html',
  styleUrls: ['./purchase-coupon.component.css']
})
export class PurchaseCouponComponent implements OnInit {

  
  public coupon: Coupon;
  public id:number;

  public constructor(private title:Title, private activeRoute: ActivatedRoute, private couponService : CouponsService, private modeService:ModeService,private router:Router) {
    this.id = this.activeRoute.snapshot.params['id'];
    this.title.setTitle("Purchase Page");
    
   }

  public ngOnInit() {
    this.couponService.getCouponByIdRest(this.id).subscribe(c =>{
      this.coupon = c;
      },err =>{
        let obj = err.error;
        alert(obj.message);    
    });
  }

  public purchaseCoupon(id: number){
    this.couponService.purchaseCoupon(this.id,localStorage.getItem("token")).subscribe(c =>{
      alert("The coupon was successfully purchased")
      this.router.navigate(["customer/coupons"]);
    }, err => {
      let obj = err.error;
      alert(obj.message);
    });
  }

}
