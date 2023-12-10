import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-logistics-statistics',
  templateUrl: './logistics-statistics.component.html',
  styleUrls: ['./logistics-statistics.component.scss'],
})
export class LogisticsStatisticsComponent implements OnInit {
  financialReportChart!: Chart;
  passengerStatisticsChart!: Chart;
  operationalPerformanceChart!: Chart;
  selectedDate: string;
  currentYear: number;
  minYear: number;

  constructor(private apiService: ApiService) {
    this.currentYear = new Date().getFullYear();
    this.minYear = 2022;
    this.selectedDate = this.currentYear.toString();
  }

  ngOnInit(): void {
    this.fetchChartData();
  }

  private fetchChartData(year?: number): void {
    if (!year) {
      year = new Date().getFullYear();
    }
    this.apiService
      .getStatistics(year)
      .subscribe((statistics: { chartData: any }) => {
        const chartData = statistics.chartData;

        this.financialReportChart = this.createChart(
          'Financial Report',
          'Monthly Revenue',
          chartData.financialReportData
        );
        this.passengerStatisticsChart = this.createChart(
          'Passenger Statistics',
          'Passengers',
          chartData.passengerStatisticsData
        );
        this.operationalPerformanceChart = this.createChart(
          'Operational Performance',
          'Percentage',
          chartData.operationalPerformanceData
        );
      });
  }

  onDateChange(): void {
    const year = parseInt(this.selectedDate, 10);
    this.fetchChartData(year);
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
