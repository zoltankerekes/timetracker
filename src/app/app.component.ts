import { Component } from '@angular/core';

import { TimeReaderService } from "./services/timereader.service";
import { CommunicationService } from "./services/communication.service";
import { LogService } from "./services/log.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimeReaderService, CommunicationService, LogService],
})
export class AppComponent {
  title = 'app';
}
