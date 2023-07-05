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

export type IAggregatedData = Map<string, OtelData[] | IChromeApiNetworkObject>;

// export type IRelevantData = Map<string, OtelData[]>; 
// key includes method, name, and traceId as a string

export type IRelevantData = OtelData[]; 

export type ITraceIdData = Map<string, OtelData[]>; 

export type ISetRelevantDataState= Dispatch<SetStateAction<IRelevantData>>;

export type ILengthsOfChartBars = number[][];






