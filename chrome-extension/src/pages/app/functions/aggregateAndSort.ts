import { IAggregatedSortedData, IOtelData, RelevantData, SetRelevantData } from '../../../types/types';


export function aggregateAndSort(setRelevantData:SetRelevantData,  incomingSpanData: IOtelData): void {  

  if(!('method' in incomingSpanData) || incomingSpanData.method === ""){
    return;
  }
  
  let {name, method, traceId, startTime, endTime, status, protocol, size} = incomingSpanData;

  if(name.startsWith("/?key=")) return;

  if(name === "/")return;

  if(name.includes("GET") || name.includes("PATCH")|| name.includes("PUT") || name.includes("DELETE") || name.includes("POST")) return;

  const lastIndex = name.lastIndexOf("/");
  name = name.slice(lastIndex + 1);

  


  setRelevantData(prevRelevantData => {
    const newRelevantData: RelevantData = new Map([...prevRelevantData.entries()]);

    const newKeyName: string = `${method}, ${name}, ${traceId}`;

    if(newRelevantData.has(newKeyName)){
      const existingData = newRelevantData.get(newKeyName);
      let hasUpdatedTime: boolean = false;

      if(startTime < existingData!.trueStartTime) {
        existingData!.trueStartTime = startTime;
        hasUpdatedTime = true;
      }
      if(endTime > existingData!.trueEndTime) {
        existingData!.trueEndTime = endTime;
        hasUpdatedTime = true;
      }
      if(existingData!.status === undefined && 'status' in incomingSpanData) existingData!.status = incomingSpanData.status;

      if(existingData!.protocol === undefined && 'protocol' in incomingSpanData) existingData!.protocol = incomingSpanData.protocol;

      if(existingData!.size === undefined && 'size' in incomingSpanData) existingData!.size = incomingSpanData.size;

      if(hasUpdatedTime) {
        existingData!.duration = existingData!.trueEndTime - existingData!.trueStartTime
      };

    }else{
      const updatedData = {
        traceId,
        method,
        status,
        protocol,
        rendering: null,
        relativeStartTime: 0,
        trueStartTime: startTime,
        trueEndTime: endTime,
        duration: endTime - startTime,
        name,
        size,
        clientSideOtelData: null
      };


      newRelevantData.set(newKeyName,updatedData);
    }
    
    const sortedRelevantData: RelevantData = sortRelevant(newRelevantData);
    return sortedRelevantData;
    
  });
}

function sortRelevant(relevantData: RelevantData): RelevantData{
 const entries = Array.from(relevantData.entries());

 entries.sort((a, b) => a[1].trueStartTime - b[1].trueStartTime);

 const sortedMap = new Map(entries);

 const earliestEntry = sortedMap.entries().next().value;

 const ssrDuration: number[] = [];

  sortedMap.forEach((request, key) => {
    const {type, trueStartTime, trueEndTime} = request;
    request.relativeStartTime = trueStartTime - earliestEntry[1].trueStartTime;

    if(type === 'document') {
      [ssrDuration[0], ssrDuration[1]] = [trueStartTime, trueEndTime]
    } else {
      if(trueStartTime >= ssrDuration[0] && trueEndTime <= ssrDuration[1]){
        request.rendering = "Server";
        request.clientSideOtelData = false;
      } else  if('traceId' in request){
        request.clientSideOtelData = true;
      }
    }
   
  })

 return sortedMap;
}

export function sortWithChromeData(setRelevantData: SetRelevantData, chromeData: IAggregatedSortedData): void{
  setRelevantData(prevRelevantData => {
    const newRelevantData: RelevantData = new Map([...prevRelevantData.entries()]);

    const {type, name, trueStartTime} = chromeData;
    const newKeyName: string = `chromeData: ${type}, ${name}, ${trueStartTime}`;

    newRelevantData.set(newKeyName, chromeData);
    const sortedRelevantData: RelevantData = sortRelevant(newRelevantData);
    return sortedRelevantData;

  })
}