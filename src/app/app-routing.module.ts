import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './design/home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DealsComponent } from './deals/deals.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';
import { AuthService } from './login/auth.service';
import { CouponAddComponent } from './Admin/coupon-add/coupon-add.component';
import { CouponUpdateComponent } from './Admin/coupon-update/coupon-update.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyUpdateComponent } from './Admin/company-update/company-update.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CompanyAddComponent } from './Admin/company-add/company-add.component';
import { CompanyCouponUpdateComponent } from './company/company-coupon-update/company-coupon-update.component';
import { CompanyCouponAddComponent } from './company/company-coupon-add/company-coupon-add.component';
import { CompanyUpdateProfileComponent } from './Company/company-update-profile/company-update-profile.component';
import { CusService } from './login/cus.service';
import { CompService } from './login/comp.service';
import { AdmService } from './login/adm.service';
import { CustomerUpdateProfileComponent } from './customer/customer-update-profile/customer-update-profile.component';
import { PurchaseCouponComponent } from './customer/purchase-coupon/purchase-coupon.component';
import { CustomerPrivateCouponsComponent } from './customer/customer-private-coupons/customer-private-coupons.component';
import { UpdateAdminComponent } from './admin/update-admin/update-admin.component';


const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "coupon-details/:id", component: CouponDetailsComponent },
  { path: "company-details/:id", canActivate:[AdmService],component: CompanyDetailsComponent },
  { path: "customer-details/:id", canActivate:[AdmService],component: CustomerDetailsComponent },
  { path: "admin/add-coupon", canActivate:[AdmService], component: CouponAddComponent },
  { path: "admin/edit-coupon/:id", canActivate:[AdmService], component: CouponUpdateComponent },
  { path: "admin/edit-company/:id", canActivate:[AdmService], component: CompanyUpdateComponent },
  { path: "admin/edit-customer/:id", canActivate:[AdmService], component: CustomerUpdateComponent },
  { path: "admin/add-company", canActivate:[AdmService], component: CompanyAddComponent },
  { path: "admin/add-customer", canActivate:[AdmService], component: CustomerAddComponent },
  { path: "admin/update", canActivate:[AdmService], component: UpdateAdminComponent },
  { path: "compnay/company-coupon-update/:id", canActivate:[CompService], component: CompanyCouponUpdateComponent },
  { path: "company/add-coupon", canActivate:[CompService], component: CompanyCouponAddComponent },
  { path: "company/update", canActivate:[CompService], component:CompanyUpdateProfileComponent },
  { path: "customer/update", canActivate:[CusService], component:CustomerUpdateProfileComponent },
  { path: "customer/coupons", canActivate:[CusService], component:CustomerPrivateCouponsComponent },
  { path: "customer/purchase-coupon/:id", canActivate:[CusService], component:PurchaseCouponComponent },
  { path: "home", canActivate:[AuthService], component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "deals", component: DealsComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: '/404', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
