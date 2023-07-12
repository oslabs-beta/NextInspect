import { IAllTracesTimeInfo, ITotalTimes } from "./getTraceInfo";
import { calcTotalTime } from "./calcTotalTime";

export function getChartJSTraceData(allTracesTimeInfo: ITotalTimes[][], earliestTime: number): number[][]{
  const output: number[][] = [];
  // let earliestTime: number;
  allTracesTimeInfo.map((singleTraceData, index) => {
    const singleChartJSData: number[] = [];

    // const firstVal: number = calcTotalTime(earliestTime, singleTraceData[0].start)
    // if(index === 0){
    //   earliestTime = singleTraceData[0].start
    // }
    const firstVal = calcTotalTime(earliestTime, singleTraceData[0].start);
  
    const secondVal: number = firstVal + singleTraceData[0].duration;
    singleChartJSData.push(firstVal, secondVal);
    output.push(singleChartJSData);
    // console.log('singleChartJSData', singleChartJSData);
  })

  return output;
}

export function getChartJSLabels(allTracesTimeInfo: ITotalTimes[][]):string[]{
  const labelsArr:string[] = allTracesTimeInfo.map((traceTimeInfo: ITotalTimes[]) => {
    return (traceTimeInfo[0].id)
  })

  return labelsArr;
}