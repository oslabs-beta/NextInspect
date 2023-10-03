import { IAggregatedSortedData, IOtelData, DataEntriesMap, SetDataEntriesMap  } from '../../../types/types';

import { createEntry, shouldIncludeOtelData, sortDataEntriesMap, updateEntry, updateName } from './datatUtils';


export function aggregateAndSort(setDataEntriesMap:SetDataEntriesMap ,  incomingSpanData: IOtelData): void {  
  // filter out incoming data 
  if(!shouldIncludeOtelData(incomingSpanData)) return;
  
  // destructure data properties 
  let {name, method, traceId} = incomingSpanData;

  // update name to be more readable for user
  name = updateName(name);

  setDataEntriesMap(prevDataEntriesMap => {
    const newKeyName: string = `${method}, ${name}, ${traceId}`;
    let newEntryData:IAggregatedSortedData;

    if(prevDataEntriesMap.has(newKeyName)){
      newEntryData = updateEntry(prevDataEntriesMap, newKeyName, incomingSpanData)
    }else{
      newEntryData = createEntry(newKeyName, incomingSpanData)
    }
    
    const sortedDataEntriesMap: DataEntriesMap = sortDataEntriesMap(prevDataEntriesMap, [newKeyName, newEntryData]);

    return sortedDataEntriesMap;
  });
}

export function sortWithChromeData(setDataEntriesMap: SetDataEntriesMap , chromeData: IAggregatedSortedData): void{
  setDataEntriesMap(prevDataEntriesMap => {
    const {type, name, trueStartTime} = chromeData;
    const newKeyName: string = `chromeData: ${type}, ${name}, ${trueStartTime}`;

    const sortedRelevantData: DataEntriesMap = sortDataEntriesMap(prevDataEntriesMap, [newKeyName, chromeData]);
    return sortedRelevantData;
  })
}

