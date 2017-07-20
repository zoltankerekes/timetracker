import { Component, OnInit } from '@angular/core';
import { TimeReaderService } from "../timereader.service";
import { DatePipe } from '@angular/common';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  private remainingTime: number;
  private subscription: Subscription;
  private timer;
  private currentSpan: number;
  private started: boolean = false;

  constructor(private timeService: TimeReaderService) { }

  ngOnInit() {
    this.timer = TimerObservable.create(this.timeService.remainingSeconds, 1000);
    this.start();
  }

  start(){
    this.subscription = this.timer.subscribe(t => {
      this.remainingTime = new Date(0,0,0,0,0,0,0).setSeconds(this.timeService.remainingSeconds - t);   
      this.currentSpan = t;
    });
    this.started = true;
  }

  stop(){
    this.subscription.unsubscribe();
    this.timeService.remainingSeconds = this.timeService.remainingSeconds - this.currentSpan - 1;
    this.started = false;
  }
}
