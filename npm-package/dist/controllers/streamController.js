"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamController = void 0;
const events_1 = require("events");
const otelEventEmitter = new events_1.EventEmitter();
exports.streamController = {
    emitEvent: (req, res, next) => {
        otelEventEmitter.emit('newOtelEvent', res.locals.telemetryData);
        return next();
    },
    sendEvent: (req, res, next) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        otelEventEmitter.on('newOtelEvent', (data) => {
            const jsonString = JSON.stringify(data);
            res.write(`data:` + `${jsonString}\n\n`);
        });
    }
};
