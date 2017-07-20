import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Activity } from '../activity';

import { CommunicationService } from "../services/communication.service";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  private activities: Activity[] = [];
  private activityName: string;
  private commSubscription: Subscription = new Subscription();

  constructor(private communicationService: CommunicationService) { 
    this.commSubscription = this.communicationService.getMessage().subscribe(message => { 
      if (message.isStarted === false) {
        for (var i = 0; i < this.activities.length; i++){
            if (message.activityName === this.activities[i].name)
              {
                this.activities[i].isStarted = false;
              }
        }
      }
      else if (message.isStarted === true) {
        for (var i = 0; i < this.activities.length; i++){
            if (message.activityName !== this.activities[i].name)
              {
                this.activities[i].isStarted = false;
              }
        }
      }
    });
  }

  ngOnInit() {
  }

  addNewActivity(){
    if (this.activityName) {
      this.activities.push(new Activity(false, this.activityName));
      this.activityName = "";
    }
  }

  start(activity: Activity){
    this.communicationService.sendMessage(true, activity.name);
    activity.isStarted = true;
  }

  stop(activity: Activity){
    this.communicationService.sendMessage(false, activity.name);
    activity.isStarted = false;
  }
}
