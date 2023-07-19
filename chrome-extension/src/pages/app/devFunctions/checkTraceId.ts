import { IOtelData, ISetTraceIdMap, ITraceIdMap } from "../../../types/types";

export function checkTraceId(setTraceIdMap: ISetTraceIdMap, incomingSpanData: IOtelData): void{
  setTraceIdMap(prevTraceIdMap => {
    const newTraceIdMap: ITraceIdMap = new Map([...prevTraceIdMap.entries()]);
    if(newTraceIdMap.has(incomingSpanData.traceId)){
      newTraceIdMap.get(incomingSpanData.traceId)?.push(incomingSpanData);
    }else {
      newTraceIdMap.set(incomingSpanData.traceId, [incomingSpanData]);
    }
    return newTraceIdMap;
  });
}