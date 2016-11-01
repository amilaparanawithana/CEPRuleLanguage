/**
 * @author chathura widanage
 */
export class Chart {
    id:number;//temporary id
    dataUrl:string;
    data:any[] = [];
    summary:number[] = [];
    options:{} = {
        animation: {
            duration: 1100,
            easing: 'linear'
        },
        hAxis: {
            titleTextStyle: {
                color: '#333'
            },
            format: 'MMM dd'
        },
        theme: 'material',
        vAxis: {
            format: 'short',
            minValue: 0

        },
        legend: 'none',
        height: 240,
        width: 510,
        tooltip: {isHtml: false}
    };
    live:boolean = false;
    updateFrequency:number = 5000;
    dataFetchFrequency:number = 15000;
    chartType:ChartType;
    title:string;

    isDirty:boolean = true;

    axisLabels:Array<string> = ["", ""];

    multipleLabels:Array<string> = [];

    constructor(dataUrl:string, live:boolean, updateFrequency:number, chartType:ChartType, axisLabels:Array<string>,
                chartTitle:string) {
        this.dataUrl = dataUrl;
        this.live = live;
        this.updateFrequency = updateFrequency;
        this.chartType = chartType;
        this.axisLabels = axisLabels;
        this.title = chartTitle;
        if (this.axisLabels) {
            this.options.hAxis['title'] = this.axisLabels[0];
            this.options.vAxis['title'] = this.axisLabels[1];
        }

    }

    updateDataPoints(data:any[], summary:number[]) {
        if (data.length == 0) {
            this.data = data;
            this.isDirty = true;
            return true;
        }
        for (var i = 0; i < data.length; i++) {
            data[i][0] = new Date(parseFloat(data[i][0]));
        }

        if (this.multipleLabels.length > 0) {
            data.unshift(this.multipleLabels);
        } else {
            data.unshift(this.axisLabels);
        }
        this.data = data;
        this.summary = summary;
        this.isDirty = true;
    }

    updateDataFetchFrequency(dataFetchFrequency:number) {
        this.dataFetchFrequency = dataFetchFrequency;
    }

    addAdditionalAxis(labels:Array<string>) {
        this.multipleLabels = [];
        this.multipleLabels.push(this.axisLabels[0]);
        for (var i in labels) {
            this.multipleLabels.push(labels[i]);
        }
    }

    setChartOptions(options:any) {
        this.options = options;
    }

    setHorizontalAxisFormat(format:string) {
        this.options.hAxis.format = format;
    }
}

export enum ChartType{
    AreaChart, PieChart, LineChart
}