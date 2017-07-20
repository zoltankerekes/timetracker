import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommunicationService {
  subject: Subject<any> = new Subject();
  constructor() { }

    sendMessage(isStarted: boolean, activityName: string) {
        this.subject.next({ 
            isStarted: isStarted,
            activityName: activityName
     });
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
