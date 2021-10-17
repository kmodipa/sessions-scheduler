import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis
} from "ng-apexcharts";
import {SessionModel} from "../../../core/models/Session.Model";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};

export type SessionData = {
  x: string;
  y: []
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  @Input() sessions: SessionModel[] | any;
  public sessionData: SessionData[] | any;

  constructor() {
    this.sessionData = Array<SessionData>();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.sessions.length);

    for (let i = 0; i < this.sessions.length; i++) {
      this.sessionData.push({
        x : this.sessions[i].name,
        y : [
          this.sessions[i].start.getTime(),
          this.sessions[i].end.getTime()
        ]
      });
    }

    this.chartOptions = {
      series: [
        {
          data: this.sessionData
        }
      ],
      chart: {
        height: 250,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: "datetime"
      }
    };
  }

}
