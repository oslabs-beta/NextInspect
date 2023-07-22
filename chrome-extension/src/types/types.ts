import { Dispatch, SetStateAction } from 'react';

export interface IOtelData {
    traceId: string,
    spanId: string,
    applicationType: string, 
    originatingService: string, 
    method?: string, 
    status?: number, 
    protocol?: string, 
    startTime: number,
    endTime: number,
    size?: number,
    type?: string, 
    urlEndpoint?: string,
    name: string
}

export type RelevantData = Map<string, IAggregatedSortedData>; 

export type SetRelevantData= Dispatch<SetStateAction<RelevantData>>;

export interface IAggregatedSortedData {
  traceId?: string,
  type?: string, 
  rendering: string | null,
  method?: string,
  status?: number, 
  protocol?: string,
  relativeStartTime: number,
  trueStartTime: number,
  trueEndTime: number,
  duration: number,
  name: string,
  size?: number,
  clientSideOtelData: boolean | null,
}


export interface IChartJSData {
  barLengths: number[][],
  labels: string[],
  backgroundColors: string[]
}
