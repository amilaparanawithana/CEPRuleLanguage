import {Http} from "angular2/http";
import {Chart} from "../../models/ui/chart";
import {Injectable} from "angular2/core";
import {RestService} from "../rest.service";
/**
 * @author chathura widanage
 */
@Injectable()
export class ChartService {

    constructor(private http:Http, private restService:RestService) {

    }

    getChart(chart:Chart) {
        return this.restService.get(chart.dataUrl).map(res=> {
            return res.json()
        });
    }


    getChartData(url:string) {
        return this.restService.get(url) .map(res => {
            return res.json()
        })
    }

    static aggregateCharts(data:any, cpuUsageChart:Chart, fieldName:string) {
        var dataPoints = [];
        var podNamesList = [];
        let firstPod = true;
        for (var podName in data.container) {
            podNamesList.push(podName);
            var d = data.container[podName].dataContainer[fieldName]['data'];
            if (firstPod) { // if the first pod then append full array, date and value
                for (var j in d) {
                    dataPoints.push(d[j]);
                }
                firstPod = false;
            } else {    //if not append only the value for the corresponding date
                for (var j in d) {
                    dataPoints[j].push(d[j][1]);
                }
            }
        }

        if (dataPoints.length > 0) {
            cpuUsageChart.addAdditionalAxis(podNamesList);
            cpuUsageChart.updateDataPoints(dataPoints, []);
        } else {
            cpuUsageChart.updateDataPoints([], []);
        }
    }
}