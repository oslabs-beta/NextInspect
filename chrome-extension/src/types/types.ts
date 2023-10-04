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

export type DataEntriesMap = Map<string, IDataEntry>; 

export type SetDataEntriesMap = Dispatch<SetStateAction<DataEntriesMap>>;

export interface IDataEntry {
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
  clientSideOtelData: boolean | null,
}


export interface IChartJSData {
  barLengths: number[][],
  labels: string[],
  backgroundColors: string[]
}

export type DataSource = 'openTelemetry' | 'chrome'