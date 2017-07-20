export class Logmodel {
    public endDate: Date;
    public duration: number;
    constructor(public startDate: Date,  public activityName: string, public durationInSeconds: number){
            this.endDate = new Date(this.startDate);
            this.endDate.setSeconds(this.endDate.getSeconds() + this.durationInSeconds);
            this.duration = new Date(0,0,0,0,0,0,0).setSeconds(this.durationInSeconds); 
    }
}
