import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';


const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'next-app',
    [SemanticResourceAttributes.SERVICE_NAMESPACE]: 'next.js'
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter({url: 'http://localhost:3002/stream/otel'})),
  instrumentations: [new HttpInstrumentation()]
});
sdk.start();