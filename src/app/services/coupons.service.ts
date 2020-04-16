import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  public constructor(private httpClient: HttpClient) { }

  private getHttpOptions() {

    //create a object
    let httpOptions = {
      //add a field for headers
      headers: new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("token")
      }), withCredentials: true,
    };
    return httpOptions;
  }

  private getHttpOptionsTxt() {
    //create a object
    let httpOptions = {
      //add a field for headers
      headers: new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("token")
      }),
      responseType: 'text' as 'json', withCredentials: true,
    };
    return httpOptions;
  }


  public getAllCoupons(): Observable<Coupon[]> {

    return this.httpClient.get<Coupon[]>("http://localhost:8080/api/coupons/all", this.getHttpOptions());

  }
  public updateAdmin(admin: Admin,token:string): Observable<Admin> {
    return this.httpClient.put<Admin>("http://localhost:8080/api/admin/update/admin/"+ token , admin , { responseType: 'text' as 'json',withCredentials:true});
  }

  public getMyAdmin(token:string): Observable<Admin> {
    return this.httpClient.get<Admin>("http://localhost:8080/api/admin/get/"+ token  , { responseType: 'json' as 'json',withCredentials:true});
  } 
  public getCouponByIdRest(id: number): Observable<Coupon> {
    return this.httpClient.get<Coupon>("http://localhost:8080/api/coupons/" + id, this.getHttpOptions());
  }

  public getAdminCouponById(id: number): Observable<Coupon> {
    return this.httpClient.get<Coupon>("http://localhost:8080/api/admin/couponbyid/" + id, this.getHttpOptions());
  }
  public deleteCoupon(id: number, token: string): Observable<any> {
    return this.httpClient.delete<any>("http://localhost:8080/api/admin/deletecoupon/" + id + "/" + token, { responseType: 'text' as 'json', withCredentials: true });
  }
  public addAdminCoupon(token: string, companyId: number, coupon: Coupon): Observable<Coupon> {
    return this.httpClient.put<Coupon>("http://localhost:8080/api/admin/createcoupon/" + companyId + "/" + token, coupon, { responseType: 'text' as 'json', withCredentials: true });
  }
  public updateAdminCoupon(couponId: number, token: string, coupon: Coupon): Observable<Coupon> {
    return this.httpClient.put<Coupon>("http://localhost:8080/api/admin/update/coupon/" + couponId + "/" + token, coupon, { responseType: 'text' as 'json', withCredentials: true });
  }



  public getAllCompanyCoupons(token: string): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>("http://localhost:8080/api/companies/allcoupons/" + token, { withCredentials: true })
  }

  public deleteCompanyCoupon(id: number, token: string): Observable<any> {
    return this.httpClient.delete<any>("http://localhost:8080/api/companies/deletecoupon/" + id + "/" + token, { responseType: 'text' as 'json', withCredentials: true })
  }
  
  public getCompanyCouponByIdRest(id: number, token: string): Observable<Coupon> {
    return this.httpClient.get<Coupon>("http://localhost:8080/api/companies/findcoupon/" + id + "/" + token, { responseType: 'json' as 'json', withCredentials: true });
  }
  public updateCompanyCoupon(couponId: number, token: string, coupon: Coupon): Observable<Coupon> {
    return this.httpClient.put<Coupon>("http://localhost:8080/api/companies/update/coupon/" + couponId + "/" + token, coupon, { responseType: 'text' as 'json', withCredentials: true });
  }

  public addCompanyCoupon(token:string,coupon: Coupon):Observable<Coupon>{
    return this.httpClient.put<Coupon>("http://localhost:8080/api/companies/add/" + token,coupon, { responseType: 'text' as 'json', withCredentials: true });
  }


  public purchaseCoupon(id:number,token:string):Observable<Coupon>{
    return this.httpClient.put<Coupon>("http://localhost:8080/api/customers/purchasecoupon/" + id+"/"+token, { responseType: 'text' as 'json', withCredentials: true });
  }
  public getAllCustomerCoupons(token:string):Observable<Coupon[]>{
    return this.httpClient.get<Coupon[]>("http://localhost:8080/api/customers/coupons/all/" +token, { withCredentials: true });
  }
  public deleteCustomerCoupon(id: number, token: string): Observable<any> {
    return this.httpClient.delete<any>("http://localhost:8080/api/customers/deletecoupon/" + id + "/" + token, { responseType: 'text' as 'json', withCredentials: true })
  }




}

