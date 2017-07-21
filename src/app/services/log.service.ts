import { Injectable } from '@angular/core';
import { Logmodel } from '../logmodel';

@Injectable()
export class LogService {
  workSecondsCounter: number = 0;
  breakSecondsCounter: number = 0;
  totalWork: number = 0;
  totalBreak: number = 0;
  logs: Logmodel[] = [];
  constructor() { 
  }

  logActivity(startDate: Date, activityName: string, durationInSeconds: number){
    this.logs.unshift(new Logmodel(startDate, activityName, durationInSeconds));
    if (activityName === "Work"){
      this.workSecondsCounter = this.workSecondsCounter + durationInSeconds;
      this.totalWork = new Date(0,0,0,0,0,0,0).setSeconds(this.workSecondsCounter);
    }
    else {
      this.breakSecondsCounter = this.breakSecondsCounter + durationInSeconds;
      this.totalBreak = new Date(0,0,0,0,0,0,0).setSeconds(this.breakSecondsCounter + durationInSeconds);
    }
  }

}
