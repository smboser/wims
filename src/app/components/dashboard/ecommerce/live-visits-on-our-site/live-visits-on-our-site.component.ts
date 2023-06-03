import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
    ApexNonAxisChartSeries,
    ApexTooltip,
    ApexLegend,
    ApexStroke,
    ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    labels: any;
    colors: any;
};

@Component({
    selector: 'app-live-visits-on-our-site',
    templateUrl: './live-visits-on-our-site.component.html',
    styleUrls: ['./live-visits-on-our-site.component.scss']
})
export class LiveVisitsOnOurSiteComponent {
    
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
  
    constructor() {
        this.chartOptions = {
            series: [56.2, 43.8],
            colors: ["#ee368c", "#757fef"],
            chart: {
                height: 365,
                type: "donut"
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "" + val + "%";
                    },
                },
            },
            stroke: {
                width: 1,
                show: true
            },
            legend: {
                offsetY: 0,
                fontSize: "14px",
                position: "bottom",
                horizontalAlign: "center"
            },
            labels: ["Domestic", "International"]
        };
    }

}