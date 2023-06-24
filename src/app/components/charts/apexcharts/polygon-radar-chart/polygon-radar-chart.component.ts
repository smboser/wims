import { Component, ViewChild } from "@angular/core";

import {
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexChart,
    ApexXAxis,
    ApexFill,
    ApexDataLabels,
    ChartComponent,
    ApexStroke,
    ApexPlotOptions,
    ApexYAxis,
    ApexMarkers
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    title: ApexTitleSubtitle;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    tooltip: any;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    colors: string[];
    yaxis: ApexYAxis;
    markers: ApexMarkers;
    xaxis: ApexXAxis;
};

@Component({
    selector: 'app-polygon-radar-chart',
    templateUrl: './polygon-radar-chart.component.html',
    styleUrls: ['./polygon-radar-chart.component.scss']
})
export class PolygonRadarChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Series 1",
                    data: [20, 100, 40, 30, 50, 80, 33]
                }
            ],
            chart: {
                height: 350,
                type: "radar"
            },
            dataLabels: {
                enabled: true
            },
            plotOptions: {
                radar: {
                    size: 140,
                    polygons: {
                        fill: {
                            colors: ["#f8f8f8", "#ffffff"]
                        }
                    }
                }
            },
            title: {
                text: "Radar with Polygon Fill"
            },
            colors: ["#757fef"],
            markers: {
                size: 4,
                colors: ["#ffffff"],
                strokeColors: ["#757fef"],
                strokeWidth: 2
            },
            tooltip: {
                y: {
                    formatter: function(val:any) {
                        return val;
                    }
                }
            },
            xaxis: {
                categories: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ]
            },
            yaxis: {
                tickAmount: 7
            }
        };
    }

}