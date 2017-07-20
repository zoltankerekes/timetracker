import { Injectable } from '@angular/core';

@Injectable()
export class TimeReaderService {

  constructor() { 
    this.remainingSeconds = 1800;
  }

  remainingSeconds: number;
}
