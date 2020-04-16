import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { ActivatedRoute } from '@angular/router';
import { CouponsService } from 'src/app/services/coupons.service';
import { ModeService } from '../services/mode.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent implements OnInit {

  public clientType:number;
  public coupon: Coupon;
  public id:number;

  public constructor(private title:Title, private activeRoute: ActivatedRoute, private couponService : CouponsService, private modeService:ModeService) { 
    this.id = this.activeRoute.snapshot.params['id'];
  }

  public ngOnInit() {
    
    if(localStorage.getItem("type") == '1'){
      this.clientType = 1;
    }
    this.couponService.getCouponByIdRest(this.id).subscribe(c =>{
      this.coupon = c;
      this.title.setTitle("Coupon Details");
      },err=>{
        let obj = JSON.parse(err.error);
        alert(obj.message);
    });
    
  }

}
