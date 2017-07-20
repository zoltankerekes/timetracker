import { Injectable } from '@angular/core';

@Injectable()
export class TimeReaderService {
  remainingSeconds: number;
  breakSeconds: number;

  constructor() { 
    this.remainingSeconds = 28800;
    this.breakSeconds = 0;
  }
}
