import { Injectable } from '@angular/core';

@Injectable()
export class TimeReaderService {

  constructor() { 
    this.remainingSeconds = 28800;
  }

  remainingSeconds: number;
}
