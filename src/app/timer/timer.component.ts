import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { TimeReaderService } from "../services/timereader.service";
import { CommunicationService } from "../services/communication.service";
import { LogService } from "../services/log.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit{
  private timer;
  private activityName: string;
  private elapsedTime: number;
  private secondsPassed: number;
  private timerSubscription: Subscription = new Subscription();
  private commSubscription: Subscription = new Subscription();
  private isStarted: boolean = false;
  private startDate: Date;

  constructor(private timeReaderService: TimeReaderService, private communicationService: CommunicationService, private logService: LogService) {
      this.commSubscription = this.communicationService.getMessage().subscribe(message => { 
        if (message.isStarted === true) {
          if(this.isStarted === true) {
            this.stop();
          }
          if (message.activityName !== "Work"){
            this.start(message.activityName);
          }
        }
        else if (message.activityName === this.activityName && this.isStarted === true)
          {
            this.stop();
          }
     });
   }

  ngOnInit() {
    this.timer = TimerObservable.create(0, 1000);
  }

  start(activityName: string) {
    this.timerSubscription = this.timer.subscribe(t => {
      this.elapsedTime = new Date(0,0,0,0,0,0,0).setSeconds(t);   
      this.timeReaderService.breakSeconds++;
      this.secondsPassed = t;
    });
    this.isStarted = true;
    this.startDate = new Date(Date.now());
    this.activityName = activityName;
  }

  stop() {
    this.timerSubscription.unsubscribe();
    this.isStarted = false;
    this.logService.logActivity(this.startDate, this.activityName, this.secondsPassed)
  }
}
