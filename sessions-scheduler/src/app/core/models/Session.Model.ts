export class SessionModel {
  constructor(name: string, start: Date, end: Date) {
    this.name = name;
    this.start = start;
    this.end = end;
  }

  name: string;
  start: Date;
  end: Date;
}
