import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { TimelineComponent } from './charts/timeline/timeline.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export const components = [
  HomeComponent,
  TimelineComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [components]
})
export class ComponentsModule {
  constructor() {
  }
}
