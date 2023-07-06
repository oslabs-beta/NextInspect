import { Dispatch, SetStateAction } from 'react';

export interface OtelData {
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

export type IChromeApiNetworkObject = {
  method?: string,
  protocol?: string,
  size?: number,
  status?: number,
  startTime?: number,
  time?: number,
  urlEndpoint?: string,
  type?: string | null,
  initiator?: string | null, 
}

export type IRelevant = Map<string, IUpdatedData>; 
// key includes method, name, and traceId as a string


export type ISetRelevantState= Dispatch<SetStateAction<IRelevant>>;


export type ILengthsOfChartBars = number[][];

export interface IUpdatedData {
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





