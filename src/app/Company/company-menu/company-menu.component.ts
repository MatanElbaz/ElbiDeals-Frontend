import { Component, OnInit } from '@angular/core';
import { CouponsService } from 'src/app/services/coupons.service';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-company-menu',
  templateUrl: './company-menu.component.html',
  styleUrls: ['./company-menu.component.css']
})
export class CompanyMenuComponent implements OnInit {

  coupons:Coupon[];

  constructor(private couponService: CouponsService) { }

  ngOnInit() {
  }

}
