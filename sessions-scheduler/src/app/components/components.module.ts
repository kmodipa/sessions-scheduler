import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { TimelineComponent } from './charts/timeline/timeline.component';
import {NgApexchartsModule} from "ng-apexcharts";

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
    NgApexchartsModule
  ], exports: [components]
})
export class ComponentsModule {
  constructor() {
  }
}
