import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PeriodModel} from "../../../core/models/Period.Model";
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
  period!: PeriodModel;
  sessions!: SessionModel[]
  periodSt = 0;
  periodEd = 0;

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
  }

  resetSessionForm(): void {

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

  submitPeriod(): void {
    this.markPeriodFormAsTouched();

    if (this.periodForm.valid) {
      this.periodRecorded = true;
      console.log('Perios');
    }
  }

  submitSession(): void {
    this.markSessionFormAsTouched();

    if (this.sessionForm.valid) {
      this.sessionRecorded = true;
      const session = new SessionModel('Session 1', new Date(), new Date());
      this.sessions.push(session);
      console.log(this.sessions);
      console.log('Sessions')
    }
  }

}
