import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { TimeReaderService } from "../services/timereader.service";
import { CommunicationService } from "../services/communication.service";

@Component({
  selector: 'app-countdowntimer',
  templateUrl: './countdowntimer.component.html',
  styleUrls: ['./countdowntimer.component.css']
})
export class CountdownTimerComponent implements OnInit {
  private timer;
  private timerMessages: any;
  private remainingTime: number;
  private timerSubscription: Subscription = new Subscription();
  private commSubscription: Subscription = new Subscription();
  private otherRunningTimers: number = 0;
  public isStarted: boolean = false;

  constructor(private timeReaderService: TimeReaderService, private communicationService: CommunicationService) {
    this.commSubscription = this.communicationService.getMessage().subscribe(message => { 
      if (message.isStarted === true) {
          this.stop();
          this.otherRunningTimers++;
        }
      else{
          this.otherRunningTimers--;
          if (this.otherRunningTimers == 0) {
            this.start();
          }
      }
     });
   }

  ngOnInit() {
    this.timer = TimerObservable.create(0, 1000);
    this.start();
  }

  start() {
    this.timerSubscription = this.timer.subscribe(t => {
      if (this.timeReaderService.remainingSeconds > 0) {
        this.timeReaderService.remainingSeconds = this.timeReaderService.remainingSeconds - 1;
        this.remainingTime = new Date(0,0,0,0,0,0,0).setSeconds(this.timeReaderService.remainingSeconds);   
      }
    });
    this.isStarted = true;
  }

  stop() {
    this.timerSubscription.unsubscribe();
    this.isStarted = false;
  }
}
