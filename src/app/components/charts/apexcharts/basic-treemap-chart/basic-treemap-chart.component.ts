import { Component, ViewChild } from "@angular/core";

import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexChart,
    ApexPlotOptions,
    ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
    legend: ApexLegend;
};

@Component({
    selector: 'app-basic-treemap-chart',
    templateUrl: './basic-treemap-chart.component.html',
    styleUrls: ['./basic-treemap-chart.component.scss']
})
export class BasicTreemapChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    data: [
                        {
                            x: "London",
                            y: 218
                        },
                        {
                            x: "New York",
                            y: 149
                        },
                        {
                            x: "Tokyo",
                            y: 184
                        },
                        {
                            x: "Beijing",
                            y: 55
                        },
                        {
                            x: "Paris",
                            y: 84
                        },
                        {
                            x: "Chicago",
                            y: 31
                        },
                        {
                            x: "Osaka",
                            y: 70
                        },
                        {
                            x: "İstanbul",
                            y: 30
                        },
                        {
                            x: "Bangkok",
                            y: 44
                        },
                        {
                            x: "Madrid",
                            y: 68
                        },
                        {
                            x: "Barcelona",
                            y: 28
                        },
                        {
                            x: "Toronto",
                            y: 19
                        },
                        {
                            x: "Shanghai",
                            y: 29
                        }
                    ]
                }
            ],
            chart: {
                height: 350,
                type: "treemap",
                toolbar: {
                    show: true
                }
            },
            title: {
                text: "Basic Treemap"
            }
        };
    }

    public generateData(count:any, yrange:any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = "w" + (i + 1).toString();
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push({
                x: x,
                y: y
            });
            i++;
        }
        return series;
    }

}