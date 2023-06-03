import { Component, ViewChild, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
} from 'ng-apexcharts';
import { TokenService } from 'src/app/components/authentication/login/token.service';
import { User } from 'src/app/components/interfaces';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: any;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'app-welcome-dashboard',
  templateUrl: './welcome-dashboard.component.html',
  styleUrls: ['./welcome-dashboard.component.scss'],
})
export class WelcomeDashboardComponent implements OnInit {
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleCardBorderTheme() {
    this.themeService.toggleCardBorderTheme();
  }

  toggleCardBorderRadiusTheme() {
    this.themeService.toggleCardBorderRadiusTheme();
  }

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    public themeService: CustomizerSettingsService,
    private tokenService: TokenService
  ) {
    this.chartOptions = {
      series: [50],
      chart: {
        height: 110,
        width: 110,
        offsetX: 2.5,
        type: 'radialBar',
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#00B69B'],
      plotOptions: {
        radialBar: {
          startAngle: -120,
          endAngle: 120,
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: 3,
              fontSize: '14px',
              fontWeight: '700',
            },
          },
        },
      },
    };
  }

  public user: User = {};

  ngOnInit() {
    this.tokenService.user$.subscribe((user) => {
      this.user = { ...user };
    });
  }
}
