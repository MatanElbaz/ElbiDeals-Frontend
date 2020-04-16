import { Component, OnInit } from '@angular/core';
import { ModeService } from '../services/mode.service';
import { Router } from '@angular/router';
import { DealsComponent } from '../deals/deals.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  [x: string]: any;

  constructor(private deals: DealsComponent,private modeService: ModeService, private router:Router) { }

  ngOnInit() {
    this.online()
  }

  public online(){
    if(localStorage.getItem('token') != null ){
      return true;
    }else {
      return false;
    }
  }
  logout(): void {  
        
    this.modeService.logout(localStorage.getItem("token")).subscribe(msg => {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("isLoggedIn");
      this.modeService.mode = this.modeService.LOOGED_OUT;
      this.modeService.clientType = null;
      
    }, err => {
      
    })
    this.modeService.clientType = null;
    this.modeService.mode = this.modeService.LOOGED_OUT;
}


applyFilter(event: any):void {
  this.router.navigate(["deals"]);
  
  this.deals.ngOnInit();
}
}
