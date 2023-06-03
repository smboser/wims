import { Component, ViewChild } from "@angular/core";
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    colors: any;
    labels: string[];
    plotOptions: ApexPlotOptions;
};

@Component({
    selector: 'app-basic-radialbar-chart',
    templateUrl: './basic-radialbar-chart.component.html',
    styleUrls: ['./basic-radialbar-chart.component.scss']
})
export class BasicRadialbarChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [70],
            chart: {
                height: 350,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: "70%"
                    }
                }
            },
            labels: ["Cricket"],
            colors: ["#757fef"]
        };
    }

}