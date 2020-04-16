import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../models/company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

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

  public getAllCompanies(token:string): Observable<Company[]> {

    return this.httpClient.get<Company[]>("http://localhost:8080/api/admin/allcompanies/"+token, {withCredentials:true});

  }
  // public getCompanyByIdRest(companyId: number): Observable<Company> {
  //   return this.httpClient.get<Company>("http://localhost:8080/api/company/" + companyId, this.getHttpOptions());
  // }

  public getCompanyById(id: number, token:string): Observable<Company> {
    return this.httpClient.get<Company>("http://localhost:8080/api/admin/companybyid/"+ id+"/"+token ,{ responseType: 'json' as 'json',withCredentials:true});
  }
  public getCompanyByEmail(email: string, token:string): Observable<Company> {
    return this.httpClient.get<Company>("http://localhost:8080/api/admin/companybyemail/"+email+"/"+token ,{ responseType: 'json' as 'json',withCredentials:true});
  }
  public deleteCompany(id: number,token:string): Observable<any> {
    return this.httpClient.delete<any>("http://localhost:8080/api/admin/deletecompany/" + id+ "/" + token , { responseType: 'text' as 'json',withCredentials:true});
  }
  public addAdminCompany(token:string, company:Company): Observable<Company> {
    return this.httpClient.put<Company>("http://localhost:8080/api/admin/createcompany/"+ token , company , { responseType: 'text' as 'json',withCredentials:true});
  }
  public updateAdminCompany(companyId:number,token:string, company: Company): Observable<Company> {
    return this.httpClient.put<Company>("http://localhost:8080/api/admin/update/company/"+ companyId +"/"+ token , company , { responseType: 'text' as 'json',withCredentials:true});
  }

  //
  public updateCompany(company: Company,token:string): Observable<Company> {
    return this.httpClient.put<Company>("http://localhost:8080/api/companies/update/company/"+ token , company , { responseType: 'text' as 'json',withCredentials:true});
  }
  public getMyCompany(token:string): Observable<Company> {
    return this.httpClient.get<Company>("http://localhost:8080/api/companies/get/"+ token  , { responseType: 'json' as 'json',withCredentials:true});
  }

  
  
}
