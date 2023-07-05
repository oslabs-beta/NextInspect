import { IAllTracesTimeInfo, ITotalTimes } from "./getTraceInfo";
import { calcTotalTime } from "./calcTotalTime";
import { ILengthsOfChartBars, IRelevantData, OtelData } from "../../../types/types";

// export function getChartJSTraceData(allTracesTimeInfo: ITotalTimes[][], earliestTime: number): number[][]{
//   const output: number[][] = [];
//   // let earliestTime: number;
//   allTracesTimeInfo.map((singleTraceData, index) => {
//     const singleChartJSData: number[] = [];

//     // const firstVal: number = calcTotalTime(earliestTime, singleTraceData[0].start)
//     // if(index === 0){
//     //   earliestTime = singleTraceData[0].start
//     // }
//     const firstVal = calcTotalTime(earliestTime, singleTraceData[0].start);
  
//     const secondVal: number = firstVal + singleTraceData[0].duration;
//     singleChartJSData.push(firstVal, secondVal);
//     output.push(singleChartJSData);
//     // console.log('singleChartJSData', singleChartJSData);
//   })

//   return output;
// }

export function getChartJSTraceData(allRequestData: IRelevantData): ILengthsOfChartBars{
  const output: ILengthsOfChartBars= [];
  // let earliestTime: number;
  allRequestData.map((singleRequestData, index) => {
    const singleChartJSData: number[] = [];

    const firstVal = calcTotalTime(allRequestData[0].startTime, singleRequestData.startTime);

    const duration = calcTotalTime(singleRequestData.endTime, singleRequestData.startTime);
  
    const secondVal: number = firstVal + duration;
    singleChartJSData.push(firstVal, secondVal);
    output.push(singleChartJSData);
  })

  return output;
}

// export function getChartJSLabels(allTracesTimeInfo: ITotalTimes[][]):string[]{
//   const labelsArr:string[] = allTracesTimeInfo.map((traceTimeInfo: ITotalTimes[]) => {
//     return (traceTimeInfo[0].id)
//   })

//   return labelsArr;
// }

export function getChartJSLabels(allRequestData: IRelevantData):string[]{
  const labelsArr:string[] = allRequestData.map((singleRequestData: OtelData) => {
    return (singleRequestData.name);
  })

  return labelsArr;
}