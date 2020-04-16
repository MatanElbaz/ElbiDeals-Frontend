import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Contact")
  }
  submitForm(){
   //send email to matanelbaz00@gmail.com
  }

}
