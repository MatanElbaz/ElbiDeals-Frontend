import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  readonly LOOGED_IN: string = 'LOOGED_IN';
  readonly LOOGED_OUT: string = 'LOOGED_OUT';

  mode: string = this.LOOGED_OUT;
  clientType: string;
  

  constructor(private httpClient: HttpClient) { }

  private getHttpOptions() {
    
    //create a object
    let httpOptions = {
      //add a field for headers
      headers: new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("token")
      }),withCredentials: true
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
      responseType: 'text' as 'json', withCredentials: true
    };
    return httpOptions;
  }

  //get token from the server- send http request (authentication)
  public logout(token:string): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/api/logout/" +token,{responseType: 'text' as 'json',withCredentials:true}); 
  }

  public loggedOut(): boolean{
    return localStorage.getItem("token") == null;
  }
  
}
