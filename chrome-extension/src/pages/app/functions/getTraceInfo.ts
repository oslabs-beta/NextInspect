// check how long the total traceDuration is by mapping over in one array of objects that share one traceId, all times and checking which time is smallest and biggest then getting the difference
// return an object with traceDuration, traceStart, traceEnd
import { OtelData, IRelevantData } from "../../../types/types";
// import { IMockData } from "../mockData";
import { calcTotalTime } from "./calcTotalTime";

// export interface ITraceTimeInfo{
//   traceDuration: number,
//   traceStart: number,
//   traceEnd: number
// }



export interface ITotalTimes{
  id: string,
  duration: number, 
  start: number,
  end: number
}



// export function getTraceTimeInfo(singleTraceData: IMockData[]): ITotalTimes[]{
export function getTraceTimeInfo(singleTraceData: OtelData[]): ITotalTimes[]{
  // return an array of totaltimes of each span in each singular trace
  const totalTimesSingleTrace: ITotalTimes[] = [];
  // while also keeping track of totals

  let traceStart!: number;
  let traceEnd!: number;

  singleTraceData.map((spanData, index) => {
    const spanDuration: number = calcTotalTime(spanData.startTime, spanData.endTime);

    const spanTotalTimes: ITotalTimes = {
      id: spanData.spanId,
      duration: spanDuration,
      start: spanData.startTime,
      end: spanData.endTime
    }

    totalTimesSingleTrace.push(spanTotalTimes);

    if(index === 0){
      traceStart = spanData.startTime;
      traceEnd = spanData.endTime;
    }else{
      if(spanData.startTime < traceStart){
        traceStart = spanData.startTime;
      }
      if(spanData.endTime > traceEnd){
        traceEnd = spanData.endTime;
      }
    }
  })

 
  const traceDuration:number = calcTotalTime(traceStart, traceEnd);

  const traceTotalTimes: ITotalTimes = {
    id: singleTraceData[0].traceId,
    duration: traceDuration,
    start: traceStart,
    end: traceEnd
  }

  totalTimesSingleTrace.unshift(traceTotalTimes)
  return totalTimesSingleTrace;
}

export interface IAllTracesTimeInfo{
  allTracesTimeInfo: ITotalTimes[][],
  earliestTime: number,
  earliestTimeSpanId: string
}

// function that creates each traceTimeInfo and pushes it into a bigger array
// export function getAllTracesTimeInfo(data: IMockData[][]): IAllTracesTimeInfo{
// export function getAllTracesTimeInfo(data: OtelData[][]): IAllTracesTimeInfo{  
//   const allTracesTimeInfo: ITotalTimes[][] = [];
//   let earliestTime!: number;
//   let earliestTimeSpanId!:string;
  
//   // data.map((singleTraceData: IMockData[], index: number) => {
//   data.map((singleTraceData: OtelData[], index: number) => {

//     // if condition for testing purposes only
//     if(index < 13){
//       const traceTimeInfo:ITotalTimes[] = getTraceTimeInfo(singleTraceData) // first elem of output gives aggregated data of total times in single trace
//       allTracesTimeInfo.push(traceTimeInfo);
//       if(index === 0){
//         earliestTime = traceTimeInfo[0].start;
//         earliestTimeSpanId = traceTimeInfo[0].id
//       }
  
//       if(traceTimeInfo[0].start < earliestTime){
//         earliestTime = traceTimeInfo[0].start;
//         earliestTimeSpanId = traceTimeInfo[0].id;
//       }
//     }
//   })

//   const output = {
//     allTracesTimeInfo,
//     earliestTime,
//     earliestTimeSpanId
//   }
  
//   return output;
// }

// export function getAllTracesTimeInfo(data: IRelevantData): IAllTracesTimeInfo{  
//   const allSpansTimeInfo: ITotalTimes[] = [];
//   let earliestTime!: number;
//   let earliestTimeSpanId!:string;
  
//   //map over the array of span objects 
//   data.map((spanData: OtelData, index: number) => {
//     // get the span duration time of each span
//     const spanDuration: number = calcTotalTime(spanData.startTime, spanData.endTime);

//     // store it into an object
//     const spanTotalTimes: ITotalTimes = {
//       id: spanData.spanId,
//       duration: spanDuration,
//       start: spanData.startTime,
//       end: spanData.endTime
//     }
//     //push span time object into the array of total spantimesinfo
//     allSpansTimeInfo.push(spanTotalTimes);

//     // if there are no objects, set earliest time 
//     if(index === 0){
//       earliestTime = allSpansTimeInfo[0].start;
//       earliestTimeSpanId = allSpansTimeInfo[0].id
//     }
//     if(allSpansTimeInfo[0].start < earliestTime){
//       earliestTime = spanTotalTimes[0].start;
//       earliestTimeSpanId = spanTotalTimes[0].id;
//     }
//   })

//   const output = {
//     allSpansTimeInfo,
//     earliestTime,
//     earliestTimeSpanId
//   }
  
//   return output;
// }

