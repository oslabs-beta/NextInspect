import { IDataEntry, IOtelData, DataEntriesMap, SetDataEntriesMap, DataSource  } from '../../../types/types';

import { createEntry, shouldIncludeOtelData, sortDataEntriesMap, updateEntry, updateName } from './datatUtils';


export function aggregateAndSort(setDataEntriesMap:SetDataEntriesMap ,  incomingData: IOtelData | IDataEntry, source:DataSource ): void {   
  if(source === 'openTelemetry'){
    const otelDataSpan = incomingData as IOtelData;

    // filter out incoming data 
    if(!shouldIncludeOtelData(otelDataSpan)) return;
  
    // destructure data properties 
    let {name, method, traceId} = otelDataSpan;
  
    // update name to be more readable for user
    name = updateName(name);
  
    setDataEntriesMap(prevDataEntriesMap => {
      const newKeyName: string = `${method}, ${name}, ${traceId}`;
      let newEntryData:IDataEntry;
  
      if(prevDataEntriesMap.has(newKeyName)){
        newEntryData = updateEntry(prevDataEntriesMap, newKeyName, otelDataSpan)
      }else{
        newEntryData = createEntry(newKeyName, otelDataSpan)
      }
      
      const sortedDataEntriesMap: DataEntriesMap = sortDataEntriesMap(prevDataEntriesMap, [newKeyName, newEntryData]);
      return sortedDataEntriesMap;
    });
    
  } else if(source === 'chrome'){
    setDataEntriesMap(prevDataEntriesMap => {
      const chromeData = incomingData as IDataEntry;
      const {type, name, trueStartTime} = chromeData;
      const newKeyName: string = `chromeData: ${type}, ${name}, ${trueStartTime}`;
  
      const sortedDataEntriesMap: DataEntriesMap = sortDataEntriesMap(prevDataEntriesMap, [newKeyName, chromeData]);
      return sortedDataEntriesMap;
    })
  }
  
}


