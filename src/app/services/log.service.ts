import { Injectable } from '@angular/core';
import { Logmodel } from '../logmodel';

@Injectable()
export class LogService {
  logs: Logmodel[] = [];
  constructor() { 
  }

  logActivity(startDate: Date, activityName: string, durationInSeconds: number){
    this.logs.unshift(new Logmodel(startDate, activityName, durationInSeconds));
  }
}
