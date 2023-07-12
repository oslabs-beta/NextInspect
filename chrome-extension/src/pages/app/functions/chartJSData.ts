import { ILengthsOfChartBars, IRelevantData } from "../../../types/types";

export function getChartJSData(allRequestData: IRelevantData): ILengthsOfChartBars{
  const output: ILengthsOfChartBars= [];

  allRequestData.forEach((request) => {
    const singleChartJSData: number[] = [request.relativeStartTime, request.relativeStartTime + request.duration];
    output.push(singleChartJSData)
  })

  return output;
}

export function getChartJSLabels(allRequestData: IRelevantData):string[]{
  const labelsArr:string[] = [];
  allRequestData.forEach((request) => {
    labelsArr.push(request.name);
  })

  return labelsArr;
}