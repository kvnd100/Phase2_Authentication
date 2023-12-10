import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-flight-modal',
  templateUrl: './flight-modal.component.html',
  styleUrls: ['./flight-modal.component.scss'],
})
export class FlightModalComponent implements OnInit {
  @Input() flight!: Flight;
  flightPlan: { location: string; expectedTime: number }[] = [];

  chartOptions: Options = {};
  lineChart!: Chart;

  ngOnInit() {
    this.flightPlan = this.flight?.flightPlan || [];
    this.chartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Flight Plan',
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        categories: this.flightPlan.map((point) => point.location),
        title: {
          text: 'Journey',
        },
      },
      yAxis: {
        title: {
          text: 'Expected Time (hours)',
        },
      },
      series: [
        {
          name: 'Flight Plan',
          data: this.flightPlan.map((point) => point.expectedTime),
          type: 'line',
        },
      ],
    };
    this.lineChart = new Chart(this.chartOptions);
  }

  constructor(public modalRef: MdbModalRef<FlightModalComponent>) {}
}
