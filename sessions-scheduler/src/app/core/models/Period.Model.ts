export class PeriodModel {
  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  start: Date;
  end: Date;
}
