// sort by startTimes

import { IRelevant, ISetSortedData, ISortedData, ITotalDuration, IUpdatedData, OtelData } from "../../../types/types";

// export default function sortData(prevSortedData: ISortedData, data: IRelevant): ISortedData {
//     const newSortedData = [...prevSortedData];

//     data.forEach((value: OtelData[]) => {
//       // find total duration
//       // then sort return array by using Math.min on first element, push to the start if it is smaller
//       let startTime: number = 0;
//       let duration: number = 0;

//       if(value.length > 1){
//         const totalDuration = calcTotalDuration(value);
//         startTime = totalDuration.startTime;
//         length = totalDuration.duration;
//       }else{
//         startTime = value[0].startTime
//         duration = value[0].endTime - startTime;
//       }

//       const {applicationType, originatingService, method, status, protocol, name} = value[0];
//       // first go through the sortedData to see if this element starts earlier and if so insert it right there using splice
//       const newUpdatedData: IUpdatedData = {
//         applicationType,
//         originatingService,
//         method,
//         status,
//         protocol,
//         name,
//         startTime,
//         relativeStartTime: 0,
//         duration
//       }
//       if(newSortedData.length === 0){
//         newSortedData.unshift(newUpdatedData);
//       }else{
//         for(let i = newSortedData.length - 1; i >= 0; i--){
//           if(newUpdatedData.startTime >= newSortedData[i].startTime){
//             newSortedData.splice(i + 1, 0, newUpdatedData);
//             newUpdatedData.relativeStartTime = newUpdatedData.startTime - newSortedData[0].startTime;
//             break;
//           }
//         }
//       }
      

//     })

//     return newSortedData;

  
// };

export default function sortData(data: IRelevant): ISortedData {
  const newSortedData:ISortedData = [];

  data.forEach((unaggregatedData: OtelData[]) => {
    // create singular object with correct times
    const newUpdatedData: IUpdatedData = createUpdatedData(unaggregatedData);

    if(newSortedData.length === 0){
      newSortedData.unshift(newUpdatedData);
    }else{
      for(let i = 0; i < newSortedData.length; i++){
        if(newUpdatedData.startTime <= newSortedData[i].startTime){
          newSortedData.splice(i, 0, newUpdatedData);
          break;
        }
      }
    }
  })
  updateRelativeStartTimes(newSortedData);
  return newSortedData;


};

function updateRelativeStartTimes(newSortedData: ISortedData):void{
  newSortedData.forEach((updatedData) => {
    updatedData.relativeStartTime = updatedData.startTime - newSortedData[0].startTime;
  });
}

function createUpdatedData(arrData: OtelData[]): IUpdatedData {
  let trueStartTime: number = Infinity;
  let trueEndTime: number = -Infinity;
  let status: number | undefined;
  let protocol: string | undefined;



  arrData.forEach((singleData) => {
    if(singleData.startTime < trueStartTime) trueStartTime = singleData.startTime;

    if(singleData.endTime > trueEndTime) trueEndTime = singleData.endTime;

    if(status === undefined && 'status' in singleData) status = singleData.status;

    if(protocol === undefined && 'protocol' in singleData) protocol = singleData.protocol;
  })

  const {applicationType, originatingService, method, name} = arrData[0];


  const newUpdatedData: IUpdatedData = {
    applicationType,
    originatingService,
    method,
    status,
    protocol,
    relativeStartTime: 0,
    startTime: trueStartTime,
    duration: trueEndTime - trueStartTime,
    name
  }


  return newUpdatedData;
}



// function calcTotalDuration(value: OtelData[]): ITotalDuration{


//   let trueStartTime: number;
//   let trueEndTime: number;
//   const startTimes: number[] = [];
//   const endTimes: number[] = [];

//   value.forEach((data: OtelData) => {
//     startTimes.push(data.startTime);
//     endTimes.push(data.endTime);
//   });

//   trueStartTime = Math.min(...startTimes);
//   trueEndTime = Math.max(...endTimes);

//   const duration = trueEndTime - trueStartTime;

//   const totalDuration = {
//     startTime: trueStartTime,
//     duration
//   }
//   return totalDuration;
// }