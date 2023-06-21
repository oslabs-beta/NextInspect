declare const telemetryInitation: (applicationName: string, port: number) => {
    tracer: import("@opentelemetry/sdk-trace-node").Tracer;
};
export default telemetryInitation;
