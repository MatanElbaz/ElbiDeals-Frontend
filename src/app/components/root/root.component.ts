import { Component, OnInit } from '@angular/core';
import { ModeService } from 'src/app/services/mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(public modeService: ModeService) { }

  ngOnInit() {
  }

  
}
