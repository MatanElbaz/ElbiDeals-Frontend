import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httpClient: HttpClient) { }

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

  public getAllCustomers(token: string): Observable<Customer[]> {

    return this.httpClient.get<Customer[]>("http://localhost:8080/api/admin/allcustomers/" + token, { withCredentials: true });
  }

  // public getCustomerByIdRest(customerId: number): Observable<Customer> {
  //   return this.httpClient.get<Customer>("http://localhost:8080/api/company/" + customerId, this.getHttpOptions());
  // }

  public getCustomerById(id: number, token:string): Observable<Customer> {
    return this.httpClient.get<Customer>("http://localhost:8080/api/admin/customerbyid/"+ id+"/"+token ,{ responseType: 'json' as 'json',withCredentials:true});
  }
  public deleteCustomer(id: number,token:string): Observable<any> {
    return this.httpClient.delete<any>("http://localhost:8080/api/admin/deletecustomer/" + id+ "/" + token , { responseType: 'text' as 'json',withCredentials:true});
  }

  public addAdminCustomer(token:string, customer:Customer): Observable<Customer> {
    return this.httpClient.put<Customer>("http://localhost:8080/api/admin/createcustomer/"+ token , customer , { responseType: 'text' as 'json',withCredentials:true});
  }

  public updateAdminCustomer(customerId:number,token:string, customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>("http://localhost:8080/api/admin/update/customer/"+ customerId +"/"+ token , customer , { responseType: 'text' as 'json',withCredentials:true});
  }

  //
  public updateCustomer(customer: Customer,token:string): Observable<Customer> {
    return this.httpClient.put<Customer>("http://localhost:8080/api/customers/update/customer/"+ token , customer , { responseType: 'text' as 'json',withCredentials:true});
  }
  public getMyCustomer(token:string): Observable<Customer> {
    return this.httpClient.get<Customer>("http://localhost:8080/api/customers/get/"+ token  , { responseType: 'json' as 'json',withCredentials:true});
  } 

  public findCustomerByEmail(email:FormControl,token:string): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/admin/customerbyemail/"+email+"/"+ token  , { responseType: 'json' as 'json',withCredentials:true});
  }
  
}
