import { ITotalTimes } from "./getTraceInfo";
import { calcTotalTime } from "./calcTotalTime";

export function createBarClassName(totalTimes: ITotalTimes, earliestTime: number, totalDuration: number): string{
  // position start time based on margin
  // duration based on percentage of view width
  // height is fixed
  // for now color is fixed
  console.log('current start:', totalTimes.start)
  console.log('current end:', totalTimes.end)
  console.log('current duration', totalTimes.duration)
  console.log('total duration', totalDuration)
  const marginLeft:number = ((totalTimes.start - earliestTime)/1000 )* 100;
  const width:number = Math.floor((totalTimes.duration/1000)* 100);

  console.log({width});
  const outputClassName = `h-5 m-3 bg-green-400 w-[${width}vw]`;
  const copiedStr:string = outputClassName;
  return copiedStr;
}