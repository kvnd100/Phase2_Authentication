import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-logistics-statistics',
  templateUrl: './logistics-statistics.component.html',
  styleUrls: ['./logistics-statistics.component.scss'],
})
export class LogisticsStatisticsComponent implements OnInit {
  financialReportChart!: Chart;
  passengerStatisticsChart!: Chart;
  operationalPerformanceChart!: Chart;

  constructor() {}

  ngOnInit(): void {
    const financialReportData = [100000, 150000, 200000, 180000, 250000];
    const passengerStatisticsData = [500, 800, 1200, 1000, 1500];
    const operationalPerformanceData = [90, 85, 92, 88, 94];

    this.financialReportChart = this.createChart(
      'Financial Report',
      'Monthly Revenue',
      financialReportData
    );
    this.passengerStatisticsChart = this.createChart(
      'Passenger Statistics',
      'Passengers',
      passengerStatisticsData
    );
    this.operationalPerformanceChart = this.createChart(
      'Operational Performance',
      'Percentage',
      operationalPerformanceData
    );
  }

  private createChart(
    title: string,
    yAxisTitle: string,
    data: number[]
  ): Chart {
    return new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: ['January', 'February', 'March', 'April', 'May'],
        title: {
          text: 'Month',
        },
      },
      yAxis: {
        title: {
          text: yAxisTitle,
        },
      },
      series: [
        {
          name: title,
          data: data,
        } as Highcharts.SeriesColumnOptions,
      ],
    });
  }
}
