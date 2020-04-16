import { Component, OnInit, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserCredentials } from '../models/user-credentials.model';
import { AuthService } from './auth.service';
import { ModeService } from '../services/mode.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  readonly LOOGED_IN: string = 'LOOGED_IN';
  readonly LOOGED_OUT: string = 'LOOGED_OUT';

  mode: string = this.LOOGED_OUT;
  

  email: string;
  password: string;
  clientType: string = undefined;

  private loggedIn = new BehaviorSubject<boolean>(localStorage.getItem("isLoggedIn") === "true");

  constructor(private modeService: ModeService, private authService: AuthService, private title: Title , private router: Router)  { }

  ngOnInit() {
    
  }


  login(): void {
    let userCredentials = new UserCredentials(this.email, this.password);

    let obsJwt = this.authService.authenticateMe(userCredentials);
    obsJwt.subscribe(myToken => {
      const obj = JSON.parse(myToken);
      localStorage.setItem("token", obj.token);
      localStorage.setItem("type", obj.type);
      this.clientType = localStorage.getItem('type');
      this.modeService.mode = this.modeService.LOOGED_IN;
      this.modeService.clientType = localStorage.getItem('type');
      this.router.navigate(["/home"])
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
    })
  }


  validateForm() {
    if (this.email == "") {
      alert("Email and Password must be filled out");
      return false;
    }

  }
}
