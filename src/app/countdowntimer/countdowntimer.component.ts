import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { TimeReaderService } from "../services/timereader.service";
import { CommunicationService } from "../services/communication.service";
import { LogService } from "../services/log.service";

@Component({
  selector: 'app-countdowntimer',
  templateUrl: './countdowntimer.component.html',
  styleUrls: ['./countdowntimer.component.css']
})
export class CountdownTimerComponent implements OnInit {
  @Input() activityName: string;
  private timer;
  private timerMessages: any;
  private remainingTime: number;
  private originalSeconds: number;
  private secondsPassed: number;
  private timerSubscription: Subscription = new Subscription();
  private commSubscription: Subscription = new Subscription();
  private otherRunningTimers: number = 0;
  public isStarted: boolean = false;
  private startDate: Date;
  private backgroundImage: string;

  constructor(private timeReaderService: TimeReaderService, private communicationService: CommunicationService, private logService: LogService) {
    this.commSubscription = this.communicationService.getMessage().subscribe(message => { 
      if (message.activityName !== this.activityName){
        if (message.isStarted === true && this.isStarted) {
            this.stop();
            this.otherRunningTimers++;
          }
        else if (message.isStarted === false){
            this.otherRunningTimers--;
            if (this.otherRunningTimers == 0) {
              this.start();
            }
        }
      }
     });
   }

  ngOnInit() {
    this.originalSeconds = this.timeReaderService.remainingSeconds;
    this.timer = TimerObservable.create(0, 1000);
    this.start();
  }

  start() {
    this.timerSubscription = this.timer.subscribe(t => {
      if (this.timeReaderService.remainingSeconds > 0) {
        this.timeReaderService.remainingSeconds = this.timeReaderService.remainingSeconds - 1;
        this.remainingTime = new Date(0,0,0,0,0,0,0).setSeconds(this.timeReaderService.remainingSeconds);
        this.secondsPassed = t;   
        this.update(this.timeReaderService.remainingSeconds);
      }
    });
    this.isStarted = true;
    this.startDate = new Date(Date.now());
    this.communicationService.sendMessage(true, this.activityName);
  }

  stop() {
    this.timerSubscription.unsubscribe();
    this.isStarted = false;
    this.logService.logActivity(this.startDate, this.activityName, this.secondsPassed)
  }

  update(percent) {
    var deg;
    if (percent < (this.originalSeconds / 2)) {
        deg = 90 + (360 * percent / this.originalSeconds);
        this.backgroundImage = 'linear-gradient(' + deg + 'deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)';
    } else if (percent >= (this.originalSeconds / 2)) {
        deg = -90 + (360 * percent / this.originalSeconds);
        this.backgroundImage = 'linear-gradient(' + deg + 'deg, transparent 50%, #00b5e8 50%),linear-gradient(90deg, white 50%, transparent 50%)';
  }
}
}
