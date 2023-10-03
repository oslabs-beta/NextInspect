import { IOtelData, DataEntriesMap, IAggregatedSortedData} from '../../../types/types';

const nameFilteringConfig = {
  excludeStartPaths: ['/?key='],
  excludeMatchPaths: ['/'],
  excludeMethodNames: ['GET', 'PATCH', 'PUT', 'DELETE', 'POST'],
}

export function shouldIncludeOtelData(data: IOtelData): boolean{
  // if method does not exist or is empty, the data span is not included
  if(!('method' in data) || data.method === ""){
    return false;
  }

  for(const path of nameFilteringConfig.excludeStartPaths){
    if(data.name.startsWith(path)) return false;
  }

  for(const path of nameFilteringConfig.excludeMatchPaths){
    if(data.name === path) return false;
  }

  for(const path of nameFilteringConfig.excludeMethodNames){
    if(data.name.includes(path)) return false;
  }

  return true;
}

export function updateName(name:string):string {
  const lastIndex = name.lastIndexOf("/");
  name = name.slice(lastIndex + 1);
  return name;
}


export function updateEntry(dataEntriesMap:DataEntriesMap, keyName:string, incomingData:IOtelData): IAggregatedSortedData{

  let {name, method, traceId, startTime, endTime, status, protocol} = incomingData;

  const existingEntry = {...dataEntriesMap.get(keyName)!};

  let hasUpdatedTime: boolean = false;

  // update start and end times of existing entry
  if(startTime < existingEntry!.trueStartTime) {
    existingEntry!.trueStartTime = startTime;
    hasUpdatedTime = true;
  }
  if(endTime > existingEntry!.trueEndTime) {
    existingEntry!.trueEndTime = endTime;
    hasUpdatedTime = true;
  }

  // update duration if start and end times have been updated
  if(hasUpdatedTime) {
    existingEntry!.duration = existingEntry!.trueEndTime - existingEntry!.trueStartTime
  };

  // update status and protocol values if entry does not yet include them
  if(existingEntry!.status === undefined && 'status' in incomingData) existingEntry!.status = incomingData.status;

  if(existingEntry!.protocol === undefined && 'protocol' in incomingData) existingEntry!.protocol = incomingData.protocol;

  return existingEntry;
}

export function createEntry(keyName:string, incomingData:IOtelData){
  let {name, method, traceId, startTime, endTime, status, protocol} = incomingData;

  const newEntry = {
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
    clientSideOtelData: null
  };


  return newEntry;
}

export function sortDataEntriesMap(prevDataEntriesMap: DataEntriesMap, newEntry:[string, IAggregatedSortedData]): DataEntriesMap{
  const entries = Array.from(prevDataEntriesMap.entries());
  entries.push(newEntry);
 
  entries.sort((a, b) => a[1].trueStartTime - b[1].trueStartTime);
 
  const updatedDataEntriesMap = new Map(entries);
 
  const earliestEntry = updatedDataEntriesMap.entries().next().value;
 
  const ssrDuration: number[] = [];
 
   updatedDataEntriesMap.forEach((request, key) => {
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
 
  return updatedDataEntriesMap;
 }


