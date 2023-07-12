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

export type IRelevantData = Map<string, IAggregatedSortedData>; 

export type ISetRelevantData= Dispatch<SetStateAction<IRelevantData>>;


export type ILengthsOfChartBars = number[][];

export interface IAggregatedSortedData {
  traceId: string,
  applicationType: string, 
  originatingService: string, 
  method?: string,
  status?: number, 
  protocol?: string,
  relativeStartTime: number,
  trueStartTime: number,
  trueEndTime: number,
  duration: number,
  name: string
}





