import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';
@Component({
  selector: 'app-flight-modal',
  templateUrl: './flight-modal.component.html',
  styleUrls: ['./flight-modal.component.scss'],
})
export class FlightModalComponent {
  @Input() flightNumber: string = '';
  flightPlan: { location: string; expectedTime: number }[] = [
    { location: 'New York', expectedTime: 800 },
    { location: 'Stop 1', expectedTime: 900 },
    { location: 'Stop 2', expectedTime: 950 },
    { location: 'Stop 3', expectedTime: 1000 },
    { location: 'Destination', expectedTime: 1100 },
  ];

  constructor(public modalRef: MdbModalRef<FlightModalComponent>) {}

  chartOptions: Options = {
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

  lineChart = new Chart(this.chartOptions);
}
