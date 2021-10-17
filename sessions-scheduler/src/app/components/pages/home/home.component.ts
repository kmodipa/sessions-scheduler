import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionModel} from "../../../core/models/Session.Model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  periodForm: FormGroup;
  sessionForm: FormGroup;
  periodRecorded = false;
  sessionRecorded = false;
  plotSessions = false;
  sessionOverlaps!: any;
  totalSessionsAggregate!: any;
  sessions!: SessionModel[]
  periodStarts!: Date;
  periodEnds!: Date;
  sessionOutOfBoundError = false;

  constructor(private formBuilder: FormBuilder) {
    this.periodForm = this.formBuilder.group({
      start: ['', [Validators.required, Validators.minLength(1)]],
      end: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.sessionForm = this.formBuilder.group({
      start: ['', [Validators.required, Validators.minLength(1)]],
      end: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.sessions = Array<SessionModel>();
    this.sessionOverlaps = 0;
    this.totalSessionsAggregate = 0;
  }

  resetSessionForm(): void {
    this.sessionForm = this.formBuilder.group({
      start: ['', [Validators.required, Validators.minLength(1)]],
      end: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  resetPeriodForm(): void {
    this.periodForm = this.formBuilder.group({
      start: ['', [Validators.required, Validators.minLength(1)]],
      end: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  resetSessionsArray(): void {
    this.sessions.length = 0;
  }

  resetAll(): void {
    this.periodRecorded = false;
    this.sessionRecorded = false;
    this.plotSessions = false;
    this.sessionOverlaps = 0;
    this.totalSessionsAggregate = 0;
    this.resetPeriodForm();
    this.resetSessionsArray()
  }

  /* Form Getters */
  get periodStart(): AbstractControl {
    return <AbstractControl>this.periodForm.get('start');
  }

  get periodEnd(): AbstractControl {
    return <AbstractControl>this.periodForm.get('end');
  }

  get sessionStart(): AbstractControl {
    return <AbstractControl>this.sessionForm.get('start');
  }

  get sessionEnd(): AbstractControl {
    return <AbstractControl>this.sessionForm.get('end');
  }

  markPeriodFormAsTouched(): void {
    this.periodStart.markAsTouched();
    this.periodEnd.markAsTouched();
  }

  markSessionFormAsTouched(): void {
    this.sessionStart.markAsTouched();
    this.sessionEnd.markAsTouched();
  }

  setPeriod(): void {
    this.markPeriodFormAsTouched();

    if (this.periodForm.valid) {
      this.periodRecorded = true;
      this.periodStarts = new Date(this.periodStart.value);
      this.periodEnds = new Date(this.periodEnd.value);
    }
  }

  addSession(): void {
    this.markSessionFormAsTouched();

    if (this.sessionForm.valid) {

      const session = new SessionModel(
        'Session ' + (this.sessions.length + 1),
        new Date(this.sessionStart.value),
        new Date(this.sessionEnd.value)
      );

      if (this.checkIfSessionFallsWithinBounds(session)) {
        this.sessionRecorded = true;
        this.sessions.push(session);
      }

      this.resetSessionForm();
    }
  }

  checkIfSessionFallsWithinBounds(session: SessionModel): boolean {
    if (session.start.getDate() >= this.periodStarts.getDate() &&
        session.end.getDate() <= this.periodEnds.getDate()) {
      this.sessionOutOfBoundError = false;
      return true;
    }
    this.sessionOutOfBoundError = true;
    return false;
  }

  plotSessionsTimeline(): void {
    setTimeout(() => {
      this.plotSessions = true;
    }, 1000);
    this.plotSessions = false;
    this.getOverlabsTotal();
    this.aggregateTotalDuration();
  }

  getOverlabsTotal(): void {
    for (let i = 0; i < this.sessions.length; i++) {
      if (this.sessions.length > 1 && ((i + 1) < this.sessions.length)) {
        if ((this.sessions[i].end.getDate() > this.sessions[i + 1].start.getDate())) {
          this.sessionOverlaps += (this.sessions[i].end.getDate() - this.sessions[i + 1].start.getDate());
        }
      }
    }
  }

  aggregateTotalDuration(): void {
    for (let i = 0; i < this.sessions.length; i++) {
      this.totalSessionsAggregate += (this.sessions[i].end.getDate() - this.sessions[i].start.getDate());
      console.log(this.sessions[i].name + ' has ' + (this.sessions[i].end.getDate() - this.sessions[i].start.getDate()) + ' days');
    }

    this.totalSessionsAggregate -= this.sessionOverlaps;
  }

}
