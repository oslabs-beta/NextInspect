export interface DefaultError {
    log: string;
    code: number;
    message: string;
}
export interface OtelData {
    traceId?: string;
    spanId?: string;
    applicationType?: string;
    originatingService?: string;
    method?: string;
    status?: number;
    protocol?: string;
    startTime?: number;
    endTime?: number;
    size?: number;
    type?: string;
    urlEndpoint?: string;
    name?: string;
}
