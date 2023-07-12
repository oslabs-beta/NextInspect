"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_node_1 = require("@opentelemetry/sdk-node");
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const instrumentation_http_1 = require("@opentelemetry/instrumentation-http");
const sdk = new sdk_node_1.NodeSDK({
    resource: new resources_1.Resource({
        [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: 'next-app',
        [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAMESPACE]: 'next.js'
    }),
    spanProcessor: new sdk_trace_node_1.SimpleSpanProcessor(new exporter_trace_otlp_http_1.OTLPTraceExporter({ url: 'http://localhost:3002/stream/otel' })),
    instrumentations: [new instrumentation_http_1.HttpInstrumentation()]
});
sdk.start();
