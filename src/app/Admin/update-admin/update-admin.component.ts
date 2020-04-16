import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CouponsService } from 'src/app/services/coupons.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  public admin = new Admin();
  public id: any;


  public adminEmail = new FormControl('', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]));
  public adminPassword = new FormControl('', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(30)]));
  
  registrationForm = new FormGroup(
    {
        email: this.adminEmail,
        password: this.adminPassword
    }
);


  constructor(private activeRoute: ActivatedRoute,private adminService:CouponsService, private router: Router) { 
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.adminService.getMyAdmin(localStorage.getItem("token")).subscribe(c => {
      this.admin = c;
      this.adminEmail.setValue(c.email);
      this.adminPassword.setValue(c.password); 
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
     
    });
  }

  public updateAdmin() {
      this.admin.email = this.adminEmail.value;
    this.admin.password = this.adminPassword.value;
    
    
    this.adminService.updateAdmin(this.admin, localStorage.getItem("token")).subscribe(c => {
      this.admin = c;
      alert("Your User updated !")
      this.router.navigate(["/home"]);
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
    })

  }

}
