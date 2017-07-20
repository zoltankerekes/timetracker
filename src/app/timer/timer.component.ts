import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { TimeReaderService } from "../services/timereader.service";
import { CommunicationService } from "../services/communication.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit{
  @Input() activityName: string;
  private timer;
  private remainingTime: number;
  private timerSubscription: Subscription = new Subscription();
  private commSubscription: Subscription = new Subscription();
  private isStarted: boolean = false;

  constructor(private timeReaderService: TimeReaderService, private communicationService: CommunicationService) {
      this.commSubscription = this.communicationService.getMessage().subscribe(message => { 
        if (message.isStarted === true && message.activityName !== this.activityName && this.isStarted === true) {
            this.stop();
        }
     });
   }

  ngOnInit() {
    this.timer = TimerObservable.create(0, 1000);
  }

  start() {
    this.timerSubscription = this.timer.subscribe(t => {
      this.remainingTime = new Date(0,0,0,0,0,0,0).setSeconds(t);   
      this.timeReaderService.breakSeconds++;
    });
    this.isStarted = true;
    this.communicationService.sendMessage(this.isStarted, this.activityName);
  }

  stop() {
    this.timerSubscription.unsubscribe();
    this.isStarted = false;
    this.communicationService.sendMessage(this.isStarted, this.activityName);
  }
}
