import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserCredentials } from '../models/user-credentials.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class AdmService implements CanActivate{
    
    canActivate(rote: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem("token") != null && localStorage.getItem("type") == "-1") {
          return true;
        } else {
          this.router.navigate(["/home"]);
          return false;
        }
      }
      constructor(private httpClient: HttpClient, private router: Router) {
    }
    private getHttpOptionsTxt() {
        //create a object
        let httpOptions = {
          //add a field for headers
          headers: new HttpHeaders({
            "Authorization": "Bearer " + sessionStorage.getItem("token")
          }),
          responseType: 'text' as 'json', withCredentials: true
        };
        return httpOptions;
      }
    
    
    
      //get token from the server- send http request (authentication)
      public authenticateMe(userCredentials: UserCredentials): Observable<any> {
        return this.httpClient.post<any>("http://localhost:8080/api/login?email=" + userCredentials.email + "&password=" + userCredentials.password, null, this.getHttpOptionsTxt());
      }
  }