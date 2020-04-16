import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private title: Title,private _location: Location, private router: Router) { }

  ngOnInit() {
    this.title.setTitle("404 Not Found")
  }

}
