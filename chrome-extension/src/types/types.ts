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






