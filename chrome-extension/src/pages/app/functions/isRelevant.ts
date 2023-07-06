import { OtelData, IRelevant, ISetRelevantState } from '../../../types/types';


export function isRelevant(setRelevant:ISetRelevantState,  incomingSpanData: OtelData): void {  
  // if there is no method attached, return
  if(!('method' in incomingSpanData) || incomingSpanData.method === ""){
    return;
  }
  

  // destructure name 
  let {name, method, traceId, startTime, endTime, applicationType, originatingService, status, protocol} = incomingSpanData;
  // check if name starts with "/?key=" , return 
  if(name.startsWith("/?key=")) return;

  // ISSUE: look even closer into spans with name === "/" to make sure if it is relevant
  if(name === "/")return;

  // ISSUE: for now gets rid of repeat data but look into this more. should also be connected to the "/" names
  if(name.includes("GET") || name.includes("PATCH")|| name.includes("PUT") || name.includes("DELETE") || name.includes("POST")) return;

  if(name.startsWith("/_next/static/")){
    const lastIndex = name.lastIndexOf("/");
    name = name.slice(lastIndex + 1);
  }


  setRelevant(prevRelevant => {
    const newRelevant: IRelevant = new Map([...prevRelevant.entries()]);

    const newKeyName: string = `${method}, ${name}, ${traceId}`;

    if(newRelevant.has(newKeyName)){
      const existingData = newRelevant.get(newKeyName);
      // if incoming data has an earlier startTime, update true start time on existingdata
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
    
    const sortedRelevant: IRelevant = sortRelevant(newRelevant);
    return sortedRelevant;
    
  });
}

function sortRelevant(relevant: IRelevant): IRelevant{
 const entries = Array.from(relevant.entries());

 entries.sort((a, b) => a[1].trueStartTime - b[1].trueStartTime);

 const sortedMap = new Map(entries);

 const earliestEntry = sortedMap.entries().next().value;

  sortedMap.forEach(request => {
    request.relativeStartTime = request.trueStartTime - earliestEntry[1].trueStartTime;
  })

 return sortedMap;
}