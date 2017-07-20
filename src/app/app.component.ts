import { Component } from '@angular/core';

import { TimeReaderService } from "./timereader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimeReaderService],
})
export class AppComponent {
  title = 'app';
}
