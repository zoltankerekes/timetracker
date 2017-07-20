import { Component, OnInit } from '@angular/core';
import { Logmodel } from '../logmodel';

import { LogService } from '../services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  logs: Logmodel[] = [];
  constructor(private logService: LogService) {
    this.logs = logService.logs;
   }

  ngOnInit() {

  }
}
