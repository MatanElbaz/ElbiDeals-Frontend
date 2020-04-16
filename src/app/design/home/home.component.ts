import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModeService } from 'src/app/services/mode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private title:Title,public modeService: ModeService, private router:Router) { }

  ngOnInit() {
    this.title.setTitle("Home");
    if(this.modeService.mode = this.modeService.LOOGED_IN ){
    
      this.modeService.clientType = localStorage.getItem("type");
    
    }
    else{
      this.router.navigate([""]);
    }
  }

}
