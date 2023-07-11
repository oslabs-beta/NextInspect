import { ILengthsOfChartBars, IRelevant } from "../../../types/types";

export function getChartJSTraceData(allRequestData: IRelevant): ILengthsOfChartBars{
  const output: ILengthsOfChartBars= [];

  allRequestData.forEach((request) => {
    // console.log('relative start time',request.relativeStartTime);
    // console.log('relative start time',request.duration);

    const singleChartJSData: number[] = [request.relativeStartTime, request.relativeStartTime + request.duration];
    output.push(singleChartJSData)
  })

  return output;
}

export function getChartJSLabels(allRequestData: IRelevant):string[]{
  const labelsArr:string[] = [];
  allRequestData.forEach((request) => {
    labelsArr.push(request.name);
  })

  return labelsArr;
}