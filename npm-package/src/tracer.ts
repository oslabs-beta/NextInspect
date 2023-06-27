// import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor, ParentBasedSampler, TraceIdRatioBasedSampler, } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
// import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
// import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ExpressInstrumentation } from 'opentelemetry-instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
// import { CollectorTraceExporter, CollectorMetricExporter, } from '@opentelemetry/exporter-collector';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';


const telemetryInitation = (applicationName: string, port: number) => {

    // const metricExporter = new PrometheusExporter({ port: port }, () => {
    //     console.log(`Find metrics at: http://localhost:${port}${PrometheusExporter.DEFAULT_OPTIONS.endpoint}`);
    // });
    // const meterProvider = new MeterProvider();
    // meterProvider.addMetricReader(metricExporter);
    //config to allow clients to further customize and add additional metrics
    // const meter = meterProvider.getMeter(applicationName);

    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: applicationName,
        }),
        sampler: new ParentBasedSampler({
            root: new TraceIdRatioBasedSampler(1)
        })
    })

    // const jaegerTraceExporter = new JaegerExporter({endpoint: 'http://localhost:14268/api/traces'});
    const nextInspectTraceExporter = new OTLPTraceExporter({ url: 'http://localhost:3002/stream/otel' });

    // provider.addSpanProcessor(new SimpleSpanProcessor(jaegerTraceExporter));
    provider.addSpanProcessor(new SimpleSpanProcessor(nextInspectTraceExporter));
    provider.register();

    registerInstrumentations({
        instrumentations: [
            new ExpressInstrumentation({
                requestHook: (span, requestInfo) => {
                    span.setAttribute('request-header', JSON.stringify(requestInfo.req.headers));
                }
            }), 
            new HttpInstrumentation(),
        ]
    })

    const tracer = provider.getTracer(applicationName);

    return { tracer };
}

export default telemetryInitation; 