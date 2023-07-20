import { IChartJSData, IRelevantData } from "../../../types/types";

export function getChartJSData(allRequestData: IRelevantData): IChartJSData{
  const ChartJSData: IChartJSData = {
    barLengths: [],
    labels: [],
    backgroundColors: []
  }
  allRequestData.forEach((request) => {
    const {relativeStartTime, duration, name, rendering} = request;
    const barLength: number[] = [relativeStartTime, relativeStartTime + duration];
    ChartJSData.barLengths.push(barLength)

    ChartJSData.labels.push(name);

    let barColor: string;
    if(rendering === "Server"){
      barColor = 'rgb(255,0,255)';
    }else{
      barColor = 'rgb(119, 219, 137)'
    }
    ChartJSData.backgroundColors.push(barColor);
  })

  return ChartJSData;
}

