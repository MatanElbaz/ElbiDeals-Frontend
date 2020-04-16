import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserCredentials } from '../models/user-credentials.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class CompService implements CanActivate {

    canActivate(rote: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem("token") != null && localStorage.getItem("type") == "2") {
          return true;
        } else {
          this.router.navigate(["/home"]);
          return false;
        }
      }
      constructor(private httpClient: HttpClient, private router: Router) {
    }

    
  }