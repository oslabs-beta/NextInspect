import { OtelData, ITraceIdData } from '../../../types/types';


export default function checkTraceId(prevTraceIdData:ITraceIdData, incomingSpanData: OtelData): ITraceIdData {  
  const newTraceIdData: ITraceIdData = {...prevTraceIdData};

  if(incomingSpanData.traceId in newTraceIdData){
    newTraceIdData[incomingSpanData.traceId].push(incomingSpanData);
  }else{
    newTraceIdData[incomingSpanData.traceId] = [incomingSpanData];
  }
  return newTraceIdData;
}
// import {IMockData} from '../mockData';

// need to refactor to take async requests into account 

// export default function checkTraceId(arrOfDataObj: IMockData[]): IMockData[][]{
// export default function checkTraceId(arrOfDataObj: OtelData[]): OtelData[][]{  
//   let singleTrace = ''; // storing current traceId 
//   let singleTraceData: OtelData[] = []; // storing all spanId objects that share one traceId
//   const output: OtelData[][] = [];

//   arrOfDataObj.map((obj, index) => {
//     if(index === 0){
//       singleTrace = arrOfDataObj[0].traceId;
//     }
//     if(newTrace){
//       singleTraceData = [];
//       newTrace = false;
//     }
//     singleTraceData.push(obj);

//     if(!arrOfDataObj[index+1]){
//       output.push(singleTraceData);
//     }else if(arrOfDataObj[index + 1].traceId !== singleTrace){
//       singleTrace = arrOfDataObj[index + 1].traceId;
//       newTrace = true;
//       // console.log(singleTraceData)
//       output.push(singleTraceData);
//     }
//   })

//   // current sliced output is only due to complications in mockData
//   return output.slice(0, 13);
// }