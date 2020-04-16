import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponsService } from 'src/app/services/coupons.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coupon-update',
  templateUrl: './coupon-update.component.html',
  styleUrls: ['./coupon-update.component.css']
})
export class CouponUpdateComponent implements OnInit {

  public coupon = new Coupon;
  public id: any;

  public companyName = new FormControl('', [Validators.required,]);
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

  public constructor(private activeRoute: ActivatedRoute, private couponService: CouponsService, private router: Router) {
    this.id = this.activeRoute.snapshot.params['id'];


  }

  public ngOnInit() {
    this.couponService.getCouponByIdRest(this.id).subscribe(c => {
      this.coupon = c;
      this.companyName.setValue(c.companyName);
      this.coupontitle.setValue(c.title);
      this.couponstartDate.setValue(c.startDate);
      this.couponendDate.setValue(c.endDate);
      this.couponcategory.setValue(c.category);
      this.coupondescription.setValue(c.description);
      this.couponamount.setValue(c.amount);
      this.couponprice.setValue(c.price);
      this.couponimage.setValue(c.imageURL);
    
    }, err => {
        this.coupon=null; 
    });

  }

  public updateCoupon() {

    this.coupon.companyName = this.companyName.value;
    this.coupon.title = this.coupontitle.value;
    this.coupon.startDate = this.couponstartDate.value;
    this.coupon.endDate = this.couponendDate.value;
    this.coupon.category = this.couponcategory.value;
    this.coupon.amount = this.couponamount.value;
    this.coupon.description = this.coupondescription.value;
    this.coupon.price = this.couponprice.value;
    this.coupon.imageURL = this.couponimage.value;

    this.couponService.updateAdminCoupon(this.id, localStorage.getItem("token"), this.coupon).subscribe(c => {
      this.coupon = c;
      alert("Coupon has been successfully updated !")
      this.router.navigate(['home']);
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
    })

  }

}
