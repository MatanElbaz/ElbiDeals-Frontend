import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CouponsService } from 'src/app/services/coupons.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.css']
})
export class CouponAddComponent implements OnInit {

  public coupon = new Coupon();
  
  public companyId = new FormControl('', [Validators.required, Validators.min(1),]);
  public coupontitle = new FormControl('',[Validators.minLength(5), Validators.maxLength(20), Validators.required, Validators.pattern('^[A-Z].*$')]);
  public couponstartDate = new FormControl('', [Validators.required,]);
  public couponendDate = new FormControl('', [Validators.required,]);
  public couponcategory = new FormControl('', [Validators.required, Validators.min(1),]);
  public couponamount = new FormControl('', [Validators.required, Validators.min(1),]);
  public coupondescription = new FormControl('',[Validators.minLength(10), Validators.maxLength(50), Validators.required]);
  public couponprice = new FormControl('', [Validators.required, Validators.min(10),]);
  public couponimage = new FormControl('',[Validators.required]);

  registrationForm = new FormGroup(
    {
        id: this.companyId,
        title: this.coupontitle,
        startDate: this.couponstartDate,
        endDate: this.couponendDate,
        category: this.couponcategory,
        amount: this.couponamount,
        description: this.coupondescription,
        price: this.couponprice,
        image: this.couponimage

    }
);
  constructor(private couponService: CouponsService, private router: Router) { }


  ngOnInit() {

  }

  public addCoupon(): void {
    const value = this.companyId.value;
    this.coupon.title = this.coupontitle.value;
    this.coupon.startDate = this.couponstartDate.value;
    this.coupon.endDate = this.couponendDate.value;
    this.coupon.category = this.couponcategory.value;
    this.coupon.amount = this.couponamount.value;
    this.coupon.description = this.coupondescription.value;
    this.coupon.price = this.couponprice.value;
    this.coupon.imageURL = this.couponimage.value;

    

    this.couponService.addAdminCoupon(localStorage.getItem("token"), value, this.coupon).subscribe(
      createCoupon => {
        alert("Coupon has been successfully Added.")
        this.router.navigate(["/home"]);
      }, err => {
        
        let obj = JSON.parse(err.error);
        
        alert(obj.message);
        
      }
    );
  }

}
