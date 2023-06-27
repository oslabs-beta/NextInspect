"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const instrumentation_1 = require("@opentelemetry/instrumentation");
const opentelemetry_instrumentation_express_1 = require("opentelemetry-instrumentation-express");
const instrumentation_http_1 = require("@opentelemetry/instrumentation-http");
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
const telemetryInitation = (applicationName, port) => {
    const provider = new sdk_trace_node_1.NodeTracerProvider({
        resource: new resources_1.Resource({
            [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: applicationName,
        }),
        sampler: new sdk_trace_base_1.ParentBasedSampler({
            root: new sdk_trace_base_1.TraceIdRatioBasedSampler(1)
        })
    });
    const nextInspectTraceExporter = new exporter_trace_otlp_http_1.OTLPTraceExporter({ url: 'http://localhost:3002/stream/otel' });
    provider.addSpanProcessor(new sdk_trace_base_1.SimpleSpanProcessor(nextInspectTraceExporter));
    provider.register();
    (0, instrumentation_1.registerInstrumentations)({
        instrumentations: [
            new opentelemetry_instrumentation_express_1.ExpressInstrumentation({
                requestHook: (span, requestInfo) => {
                    span.setAttribute('request-header', JSON.stringify(requestInfo.req.headers));
                }
            }),
            new instrumentation_http_1.HttpInstrumentation(),
        ]
    });
    const tracer = provider.getTracer(applicationName);
    return { tracer };
};
exports.default = telemetryInitation;
