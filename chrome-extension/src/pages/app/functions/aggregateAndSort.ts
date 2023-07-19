import { IAggregatedSortedData, IOtelData, IRelevantData, ISetRelevantData } from '../../../types/types';


export function aggregateAndSort(setRelevant:ISetRelevantData,  incomingData: IOtelData): void {  
  if(!('method' in incomingData) || incomingData.method === ""){
    return;
  }
  
  let {name, method, traceId, startTime, endTime, applicationType, originatingService, status, protocol} = incomingData;

  if(name.startsWith("/?key=")) return;

  if(name === "/")return;

  // if(name.includes("GET") || name.includes("PATCH")|| name.includes("PUT") || name.includes("DELETE") || name.includes("POST")) return; // better to do if the method matches the name

  if(name.includes(method!)) return;



  if(name.startsWith("/_next/static/")){
    const lastIndex = name.lastIndexOf("/");
    name = name.slice(lastIndex + 1);
  }


  setRelevant(prevRelevant => {
    const newRelevant: IRelevantData = new Map([...prevRelevant.entries()]);

    const newKeyName: string = `${method}, ${name}, ${traceId}`;

    if(newRelevant.has(newKeyName)){
      const existingData = newRelevant.get(newKeyName);
      let hasUpdatedTime: boolean = false;

      if(startTime < existingData!.trueStartTime) {
        existingData!.trueStartTime = startTime;
        hasUpdatedTime = true;
      }
      if(endTime > existingData!.trueEndTime) {
        existingData!.trueEndTime = endTime;
        hasUpdatedTime = true;
      }
      if(existingData!.status === undefined && 'status' in incomingData) existingData!.status = incomingData.status;

      if(existingData!.protocol === undefined && 'protocol' in incomingData) existingData!.protocol = incomingData.protocol;

      if(hasUpdatedTime) {
        existingData!.duration = existingData!.trueEndTime - existingData!.trueStartTime
      };

    }else{
      const updatedData = {
        traceId,
        applicationType,
        originatingService,
        method,
        status,
        protocol,
        relativeStartTime: 0,
        trueStartTime: startTime,
        trueEndTime: endTime,
        duration: endTime - startTime,
        name
      };


      newRelevant.set(newKeyName,updatedData);
    }
    
    const sortedRelevant: IRelevantData = sortRelevant(newRelevant);
    return sortedRelevant;
    
  });
}

export function sortWithChromeDataType(setRelevantData: ISetRelevantData,updatedChromeDataType: IAggregatedSortedData){
  setRelevantData(prevRelevantData => {
    const newRelevantData: IRelevantData = new Map([...prevRelevantData.entries()]);
    const {chromeApiDataType, name, trueStartTime} = updatedChromeDataType
      const newKeyName = `${chromeApiDataType} ${name} ${trueStartTime}`
      newRelevantData.set(newKeyName, updatedChromeDataType);
      const sortedRelevant: IRelevantData = sortRelevant(newRelevantData);
      return sortedRelevant;
  })
}

export function sortRelevant(relevant: IRelevantData): IRelevantData{
 const entries = Array.from(relevant.entries());

 entries.sort((a, b) => a[1].trueStartTime - b[1].trueStartTime);

 const sortedMap = new Map(entries);

 const earliestEntry = sortedMap.entries().next().value;

  sortedMap.forEach(request => {
    request.relativeStartTime = request.trueStartTime - earliestEntry[1].trueStartTime;
  })

 return sortedMap;
}